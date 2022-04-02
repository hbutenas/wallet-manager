const CustomError = require('../errors');
const { getWallet } = require('../dao/Wallet');
const { createBalance, deleteBalance, getBalance } = require('../dao/Balance');

/**
 * Creating a balance basically means - Reset
 * check is it creating for first time? if yes, just insert balance
 * if not for first time, delete everything from balance and insert new one
 */
const createBalanceService = async Request => {
    const { total_balance } = Request.body;
    const { user_id } = Request.user;

    // check wallet, does it exist?
    const wallet = await getWallet('user_id', user_id);

    // wallet does not exists
    if (wallet.length <= 0) throw new CustomError.BadRequest('Before setting balance create wallet first');

    // wallet exists, removing all previous data and inserting new one
    await deleteBalance('wallet_id', wallet[0].wallet_id);

    const payload = {
        wallet_id: wallet[0].wallet_id,
        total_balance
    };

    const balance = await createBalance(payload);

    if (balance.length <= 0) throw new CustomError.BadRequest('Something went wrong... Please try again later');

    return balance;
};

const updateBalanceService = async Request => {
    const { action } = Request.query;
    const { amount } = Request.body;
    const { user_id } = Request.user;

    // check wallet, does it exist?
    const wallet = await getWallet('user_id', user_id);
    // wallet does not exists
    if (wallet.length <= 0) throw new CustomError.BadRequest('Before setting balance create wallet first');

    const balance = await getBalance('wallet_id', wallet[0].wallet_id);

    const balancePayload = {
        wallet_id: wallet[0].wallet_id,
        action,
        amount,
        total_balance: action === 'increase' ? balance[balance.length - 1].total_balance + amount : balance[balance.length - 1].total_balance - amount
    };

    const newBalance = await createBalance(balancePayload);

    if (newBalance.length <= 0) throw new CustomError.BadRequest('Something went wrong... Please try again later');

    return newBalance;
};

module.exports = { createBalanceService, updateBalanceService };

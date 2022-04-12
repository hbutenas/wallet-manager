const CustomError = require('../errors');
const { getWallet } = require('../dao/Wallet');
const { createBalance, deleteBalance, getBalance } = require('../dao/Balance');

const createBalanceService = async Request => {
    const { total_balance } = Request.body;
    const { user_id } = Request.user;

    const wallet = await walletValidator('user_id', user_id);

    const existingBalance = await getBalance('wallet_id', wallet[0].wallet_id);
    
    if (existingBalance.length > 0) return { message: 'Delete balance first to create starting point.' };

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

    const wallet = await walletValidator('user_id', user_id);

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

const getBalanceService = async Request => {
    const { amount } = Request.query;
    const { user_id } = Request.user;

    const wallet = await walletValidator('user_id', user_id);

    const balance = await getBalance('wallet_id', wallet[0].wallet_id);

    if (balance.length <= 0) throw new CustomError.BadRequest('Balance is empty. Please add some balance');

    if (amount) {
        // returning provided amount of balance records
        return balance.reverse().slice(0, amount);
    } else {
        // by default returning last 10 records
        return balance.reverse().slice(0, 10);
    }
};

const deleteBalanceService = async reqUser => {
    const { user_id } = reqUser;

    const wallet = await walletValidator('user_id', user_id);

    const balance = await getBalance('wallet_id', wallet[0].wallet_id);

    if (balance.length <= 0) throw new CustomError.BadRequest("Can't delete balance which is already empty");

    const deletedBalance = await deleteBalance('wallet_id', wallet[0].wallet_id);

    if (deletedBalance > 0) return { message: 'Balance successfully deleted' };
    else return CustomError.InternalServer('Something went wrong... Please try again later');
};

const walletValidator = async (property, value) => {
    // check wallet, does it exist?
    const wallet = await getWallet(property, value);
    // wallet does not exists
    if (wallet.length <= 0) throw new CustomError.BadRequest('Before setting balance create wallet first');
    else return wallet;
};

module.exports = { createBalanceService, updateBalanceService, getBalanceService, deleteBalanceService };

const CustomError = require('../errors/');
const { getWallet } = require('../dao/Wallet');
const createWalletMiddleware = async (req, res, next) => {
    const { wallet_name } = req.body;

    if (!wallet_name) throw new CustomError.BadRequest('Wallet name is required');

    if (wallet_name.trim() === '') throw new CustomError.BadRequest('Wallet name is required');

    const illegalChars = /[~`!#$%@\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;

    if (illegalChars.test(wallet_name)) {
        throw new CustomError.BadRequest('Invalid characters are not allowed. Provide valid values');
    }

    next();
};

/// Do not delete, maybe for future updates will be useful

// const identifyWalletOwner = async (req, res, next) => {
//     const { id: walletId } = req.params;
//     const { user_id } = req.user;

//     // find the wallet by provided wallet id
//     const wallet = await getWallet('wallet_id', walletId);

//     // wallet does not exists
//     if (wallet.length <= 0) throw new CustomError.BadRequest(`Wallet with id ${walletId} does not exists`);

//     // not the actual user is trying to update his own wallet
//     if (wallet[0].user_id !== user_id) throw new CustomError.BadRequest(`Wallet with id ${walletId} does not exists`);

//     next();
// };

module.exports = { createWalletMiddleware };

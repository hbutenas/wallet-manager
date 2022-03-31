const CustomError = require('../errors/');

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
module.exports = { createWalletMiddleware };

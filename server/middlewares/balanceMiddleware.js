const CustomError = require('../errors/');

const createBalanceMiddleware = async (req, res, next) => {
    const { total_balance } = req.body;

    if (typeof total_balance !== 'number') throw new CustomError.BadRequest('Invalid balance type provided');

    if (total_balance < 0) throw new CustomError.BadRequest("Balance can't be less than 0");

    next();
};

const updateBalanceMiddleware = async (req, res, next) => {
    const { action } = req.query;
    const { amount } = req.body;

    if (!action || action.trim() === '') throw new CustomError.BadRequest('Invalid action type provided');

    if (typeof amount !== 'number') throw new CustomError.BadRequest('Invalid amount type provided');

    if (amount < 0) throw new CustomError.BadRequest("Amount can't be less than 0");

    next();
};
module.exports = { createBalanceMiddleware, updateBalanceMiddleware };

const { StatusCodes } = require('http-status-codes');
const { createBalanceService, updateBalanceService } = require('../services/balanceService');

const createBalanceController = async (req, res) => {
    const response = await createBalanceService(req);
    res.status(StatusCodes.CREATED).json({ response });
};

const updateBalanceController = async (req, res) => {
    const response = await updateBalanceService(req);
    res.status(StatusCodes.CREATED).json({ response });
};
module.exports = { createBalanceController, updateBalanceController };

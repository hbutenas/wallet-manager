const { StatusCodes } = require('http-status-codes');
const { createBalanceService, updateBalanceService, getBalanceService, deleteBalanceService } = require('../services/balanceService');

const createBalanceController = async (req, res) => {
    const response = await createBalanceService(req);
    res.status(StatusCodes.CREATED).json({ response });
};

const updateBalanceController = async (req, res) => {
    const response = await updateBalanceService(req);
    res.status(StatusCodes.OK).json({ response });
};

const getBalanceController = async (req, res) => {
    const response = await getBalanceService(req);
    res.status(StatusCodes.OK).json({ response });
};

const deleteBalanceController = async (req, res) => {
    const response = await deleteBalanceService(req.user);
    res.status(StatusCodes.OK).json({ response });
};

module.exports = { createBalanceController, updateBalanceController, getBalanceController, deleteBalanceController };

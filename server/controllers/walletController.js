const { StatusCodes } = require('http-status-codes');
const { createWalletService, getWalletService, updateWalletService, deleteWalletService } = require('../services/walletService');

const createWalletController = async (req, res) => {
    const response = await createWalletService(req);
    res.status(StatusCodes.CREATED).json({ response });
};

const getWalletController = async (req, res) => {
    const response = await getWalletService(req.user);
    res.status(StatusCodes.OK).json({ response });
};

const updateWalletController = async (req, res) => {
    const response = await updateWalletService(req);
    res.status(StatusCodes.OK).json({ response });
};

const deleteWalletController = async (req, res) => {
    const response = await deleteWalletService(req);
    res.status(StatusCodes.OK).json({ response });
};
module.exports = { createWalletController, getWalletController, updateWalletController, deleteWalletController };

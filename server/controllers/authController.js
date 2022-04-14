const { StatusCodes } = require('http-status-codes');
const { registerUserService, loginUserService, logoutUserService, verifyUserService } = require('../services/authService');

const registerUserController = async (req, res) => {
    const response = await registerUserService(req.body);
    res.status(StatusCodes.CREATED).json({ response });
};

const loginUserController = async (req, res) => {
    const response = await loginUserService(req.body, res);
    res.status(StatusCodes.OK).json({ response });
};

const logoutUserController = async (req, res) => {
    const response = await logoutUserService(res);
    res.status(StatusCodes.OK).json({ response });
};

const verifyUserController = async (req, res) => {
    const response = await verifyUserService(req);
    res.status(StatusCodes.OK).json({ response });
};
module.exports = { registerUserController, loginUserController, logoutUserController, verifyUserController };

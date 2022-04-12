const express = require('express');
const router = express.Router();

// controllers
const { createWalletController, getWalletController, updateWalletController, deleteWalletController } = require('../controllers/walletController');
// middlewares
const { createWalletMiddleware } = require('../middlewares/walletMiddleware');
const { authenticateUser } = require('../middlewares/authMiddleware');

router
    .route('/')
    .post([authenticateUser, createWalletMiddleware], createWalletController)
    .get([authenticateUser], getWalletController)
    .patch([authenticateUser, createWalletMiddleware], updateWalletController)
    .delete([authenticateUser], deleteWalletController);

module.exports = router;

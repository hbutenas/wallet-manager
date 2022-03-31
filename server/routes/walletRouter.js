const express = require('express');
const router = express.Router();

// controllers
const { createWalletController } = require('../controllers/walletController');
// middlewares
const { createWalletMiddleware } = require('../middlewares/walletMiddleware');

router.route('/').post(createWalletMiddleware, createWalletController);

module.exports = router;

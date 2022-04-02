const express = require('express');
const router = express.Router();

// controllers
const { createWalletController, getWalletController, updateWalletController, deleteWalletController } = require('../controllers/walletController');
// middlewares
const { createWalletMiddleware, identifyWalletOwner } = require('../middlewares/walletMiddleware');
const { authenticateUser } = require('../middlewares/authMiddleware');

router.route('/').post([authenticateUser, createWalletMiddleware], createWalletController).get([authenticateUser], getWalletController);

/// reusing the same createWalletMiddleware, because just validating wallet_name
router
    .route('/:id')
    .patch([authenticateUser, identifyWalletOwner, createWalletMiddleware], updateWalletController)
    .delete([authenticateUser, identifyWalletOwner], deleteWalletController);
module.exports = router;

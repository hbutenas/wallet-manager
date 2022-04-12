const express = require('express');
const router = express.Router();

// controllers
const {
    createBalanceController,
    updateBalanceController,
    getBalanceController,
    deleteBalanceController
} = require('../controllers/balanceController');

// middlewares
const { authenticateUser } = require('../middlewares/authMiddleware');
const { createBalanceMiddleware, updateBalanceMiddleware } = require('../middlewares/balanceMiddleware');

// Sets the amount of money in the balance
// Receive the ballance
router
    .route('/')
    .post([authenticateUser, createBalanceMiddleware], createBalanceController)
    .get([authenticateUser], getBalanceController)
    .delete([authenticateUser], deleteBalanceController);

// Makes the action ['increase','decrease']
router.route('/action').post([authenticateUser, updateBalanceMiddleware], updateBalanceController);

module.exports = router;

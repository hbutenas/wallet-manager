const express = require('express');
const router = express.Router();

// controllers
const { createBalanceController, updateBalanceController } = require('../controllers/balanceController');

// middlewares
const { authenticateUser } = require('../middlewares/authMiddleware');
const { createBalanceMiddleware, updateBalanceMiddleware } = require('../middlewares/balanceMiddleware');

// Sets the amount of money in the balance
router.route('/').post([authenticateUser, createBalanceMiddleware], createBalanceController);

// Makes the action ['increase','decrease']
//  create negaliu middleware naudot,nes reik per query nustatyt koki actiona atlieka
router.route('/action').post([authenticateUser, updateBalanceMiddleware], updateBalanceController);

module.exports = router;

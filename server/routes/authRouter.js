const express = require('express');
const router = express.Router();

// controllers
const { registerUserController, loginUserController, logoutUserController, verifyUserController } = require('../controllers/authController');
// middlewares
const { registerUserMiddleware, loginUserMiddleware, authenticateUser, verifyUserMiddleware } = require('../middlewares/authMiddleware');

router.post('/register', registerUserMiddleware, registerUserController);
router.post('/login', loginUserMiddleware, loginUserController);
router.post('/logout', logoutUserController);
router.post('/verify-user', [authenticateUser], verifyUserController);

module.exports = router;

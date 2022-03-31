const express = require('express');
const router = express.Router();

// controllers
const { registerUserController, loginUserController, logoutUserController } = require('../controllers/authController');
// middlewares
const { registerUserMiddleware, loginUserMiddleware } = require('../middlewares/authMiddleware');

router.post('/register', registerUserMiddleware, registerUserController);
router.post('/login', loginUserMiddleware, loginUserController);
router.post('/logout', logoutUserController);

module.exports = router;

const CustomError = require('../errors/');
const { assignCookiesToResponse, verifyToken } = require('../utils/jwtUtils');
///  basic validation before sending the request from controller to service
const registerUserMiddleware = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new CustomError.BadRequest('Missing values to create new user');
    }

    if (username.trim() === '' || password.trim() === '') {
        throw new CustomError.BadRequest('Missing values to create new user');
    }

    if (password.length < 6) {
        throw new CustomError.BadRequest('Password is too short');
    }

    const illegalChars = /[~`!#$%@\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;

    if (illegalChars.test(username)) {
        throw new CustomError.BadRequest('Invalid characters are not allowed. Provide valid values');
    }

    next();
};

///  basic validation before sending the request from controller to service
const loginUserMiddleware = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new CustomError.BadRequest('Invalid username or password');
    }

    if (username.trim() === '' || password.trim() === '') {
        throw new CustomError.BadRequest('Invalid username or password');
    }

    next();
};

/// identifies request author
const authenticateUser = async (req, res, next) => {
    const { refresh_token, access_token } = req.cookies;

    if (!refresh_token && !access_token) {
        throw new CustomError.Unauthenticated('Authentication invalid');
    }

    if (access_token) {
        const user = await verifyToken(access_token, process.env.ACCESS_TOKEN);
        if (!user) {
            throw new CustomError.Unauthenticated('Authentication invalid');
        } else {
            req.user = user;
            next();
        }
    } else if (refresh_token) {
        const user = await verifyToken(refresh_token, process.env.REFRESH_TOKEN);
        if (!user) {
            throw new CustomError.Unauthenticated('Authentication invalid');
        } else {
            req.user = user;
            await assignCookiesToResponse({ user_id: user.user_id, username: user.username }, res);
            next();
        }
    }
};

module.exports = { registerUserMiddleware, loginUserMiddleware, authenticateUser };

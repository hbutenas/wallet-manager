const { createUser, getSingleUser, getSingleUserPassword } = require('../dao/Users');
const { hashPassword, validatePassword } = require('../utils/bcryptUtils');
const { assignCookiesToResponse } = require('../utils/jwtUtils');
const CustomError = require('../errors');

/**
 * Usernames has to be saved as lowercase
 */
const registerUserService = async reqBody => {
    const { username, password } = reqBody;

    const lowerCasedUsername = username.toLowerCase();

    const existingUser = await getSingleUser('username', lowerCasedUsername);

    if (existingUser.length > 0) throw new CustomError.BadRequest('Username is already taken');

    const userPayload = {
        username: lowerCasedUsername,
        password: await hashPassword(password)
    };

    const newUser = await createUser(userPayload);

    if (newUser.length <= 0) throw new CustomError.InternalServer('Something went wrong.. Please try again later');

    return newUser;
};

/**
 * Usernames as lower case always!
 */
const loginUserService = async (reqBody, Response) => {
    const { username, password } = reqBody;

    const lowerCasedUsername = username.toLowerCase();

    const existingUser = await getSingleUserPassword('username', lowerCasedUsername);

    if (existingUser.length <= 0) throw new CustomError.BadRequest('Invalid username or password');

    const isPasswordMatching = await validatePassword(password, existingUser[0].password);

    if (!isPasswordMatching) throw new CustomError.BadRequest('Invalid username or password');

    const jwtPayload = {
        user_id: existingUser[0].user_id,
        username: existingUser[0].username
    };

    const accessToken = await assignCookiesToResponse(jwtPayload, Response);

    if (!accessToken) throw new CustomError.InternalServer('Something went wrong... Please try again later');
    else return { message: `We are happy to see you here!`, accessToken };
};

const logoutUserService = async Response => {
    Response.clearCookie('access_token');
    Response.clearCookie('refresh_token');

    return { message: 'Successfully logged out' };
};

const verifyUserService = async Request => {
    const { user_id, username } = Request.user;
    return { user_id, username };
};

module.exports = { registerUserService, loginUserService, logoutUserService, verifyUserService };

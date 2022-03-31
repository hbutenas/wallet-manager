const database = require('../database/knex');

const createUser = async payload => {
    return database('users').insert(payload).returning(['user_id', 'username']);
};

const getSingleUser = async (property, value) => {
    return database('users').column(['user_id', 'username']).where(property, value);
};

const getSingleUserPassword = async (property, value) => {
    return database('users').column(['user_id', 'username', 'password']);
};

const getAllUsers = async () => {};

const updateUser = async (property, value, payload) => {};

const deleteUser = async (property, value) => {};

module.exports = { createUser, getSingleUser, getSingleUserPassword };

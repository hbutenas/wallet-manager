const database = require('../database/knex');

const createBalance = async payload => {
    return database('balance').insert(payload).returning('*');
};

const deleteBalance = async (property, value) => {
    return database('balance').where(property, value).del();
};

const getBalance = async (property, value) => {
    return database('balance').returning('*');
};
module.exports = { createBalance, deleteBalance, getBalance };

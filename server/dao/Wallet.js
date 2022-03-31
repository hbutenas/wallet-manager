const database = require('../database/knex');

const createWallet = async payload => {
    return database('wallet').insert(payload).returning(['wallet_id', 'wallet_name']);
};

const getWallet = async (property, value) => {
    return database('wallet').where(property, value).returning(['wallet_id', 'wallet_name', 'created_at']);
};

const updateWallet = async (property, value, payload) => {
    return database('wallet').where(property, value).update(payload).returning('*');
};

const deleteWallet = async (property, value) => {
    return database('wallet').where(property, value).del();
};

module.exports = { createWallet, getWallet, updateWallet, deleteWallet };

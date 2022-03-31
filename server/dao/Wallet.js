const database = require('../database/knex');

const createWallet = async payload => {
    return database('wallet').insert(payload).returning(['wallet_id', 'wallet_name']);
};

module.exports = { createWallet };

exports.up = function (knex) {
    return knex.schema.createTable('balance', table => {
        table.increments('balance_id').primary();
        table.integer('wallet_id').unsigned();
        table.foreign('wallet_id').references('wallet_id').inTable('wallet').onDelete('CASCADE');
        table.enum('action', ['increase', 'decrease', 'created']).defaultTo('created');
        table.integer('amount').defaultTo(0);
        table.integer('total_balance');
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};
exports.down = function (knex) {
    // return knex.schema.dropTable('wallet');
    return knex.raw('DROP TABLE balance CASCADE');
};

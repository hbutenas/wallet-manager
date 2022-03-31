exports.up = function (knex) {
    return knex.schema.createTable('balance', table => {
        table.increments('balance_id').primary();
        table.integer('wallet_id').unsigned();
        table.foreign('wallet_id').references('wallet_id').inTable('wallet').onDelete('CASCADE');
        table.string('action').notNullable();
        table.integer('total_balance').notNullable();
        table.integer('amount').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('wallet');
};

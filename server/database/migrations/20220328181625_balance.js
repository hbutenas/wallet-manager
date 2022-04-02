exports.up = function (knex) {
    return knex.schema.createTable('balance', table => {
        table.increments('balance_id').primary();
        table.integer('wallet_id').unsigned();
        table.foreign('wallet_id').references('wallet_id').inTable('wallet').onDelete('CASCADE');
        table.enum('action', ['increase', 'decrease']).notNullable(); // might be that I will need to use .enum('action',['increase','decrease'])
        table.integer('amount').notNullable();
        table.integer('total_balance_new').notNullable();
        table.integer('total_balance_previous').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};
exports.down = function (knex) {
    // return knex.schema.dropTable('wallet');
    return knex.raw('DROP TABLE balance CASCADE');
};

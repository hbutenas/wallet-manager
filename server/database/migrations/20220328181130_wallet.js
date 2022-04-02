exports.up = function (knex) {
    return knex.schema.createTable('wallet', table => {
        table.increments('wallet_id').primary();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('user_id').inTable('users').onDelete('CASCADE');
        table.string('wallet_name').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};
exports.down = function (knex) {
    // return knex.schema.dropTable('wallet');
    return knex.raw('DROP TABLE wallet CASCADE');
};

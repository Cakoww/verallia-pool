
exports.up = function(knex) {
    return knex.schema.createTable('party', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.integer('no').notNullable();
        table.string('legenda').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('party');
};

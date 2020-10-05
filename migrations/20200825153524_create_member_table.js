
exports.up = function(knex) {
    
    return knex.schema.createTable('member', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('surname');
        table.decimal('popularity');
        table.string('photo_url');
        table.string('id_party').notNullable();
        
        table.foreign('id_party').references('id').inTable('party')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('member');
};

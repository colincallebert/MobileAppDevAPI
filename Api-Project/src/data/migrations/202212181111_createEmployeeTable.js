const {
    tables
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.employee, (table) => {
            table.increments('id')
                .primary()
                .notNullable();
            table.integer('number')
                .notNullable();

            table.string('name', 255)
                .notNullable();

            table.string('firstname', 255)
                .notNullable();
            
            table.string('role', 255)
                .notNullable();
            table.integer('departementId')
                .notNullable();
        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.employee);
    },
};
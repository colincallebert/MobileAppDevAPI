const {
    tables
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.user, (table) => {
            table.increments('id')
                .primary()
                .notNullable();

            table.string('email', 255)
                .unique();

            table.string('name', 255)
                .notNullable()
                .unique();

            table.date('birthday')

            table.string('auth0id', 255)
                .notNullable();

        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.user);
    },
};
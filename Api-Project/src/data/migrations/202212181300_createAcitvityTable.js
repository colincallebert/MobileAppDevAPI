const {
    tables
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.activity, (table) => {
            table.increments('id')
                .primary()
                .notNullable();

            table.string('title', 255)
                .notNullable();

            table.dateTime('startTime')
                .notNullable();
            table.dateTime('endTime')
                .notNullable();
            table.string('description', 3200);
            table.integer('maxregistrations');
            table.integer('organizerId')
                .notNullable();
        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.activity);
    },
};
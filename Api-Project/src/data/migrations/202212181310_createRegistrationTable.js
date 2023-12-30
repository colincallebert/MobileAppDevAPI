const {
    tables
} = require('..');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.registration, (table) => {

            table.integer('amount')
                .notNullable();

            table.integer('userid')
                .unsigned()
                .notNullable();

            table.foreign('userid', 'fk_registration_user')
                .references(`${tables.user}.id`)
                .onDelete('CASCADE');

            table.integer('activityid')
                .unsigned()
                .notNullable();

            table.foreign('activityid', 'fk_registration_activity')
                .references(`${tables.activity}.id`)
                .onDelete('CASCADE');
            
            table.primary(['userid', 'activityid']);
        });
    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.registration);
    },
};
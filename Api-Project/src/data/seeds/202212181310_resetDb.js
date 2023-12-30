const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    // first delete all entries in every table
    await knex(tables.registration).delete();
    await knex(tables.activity).delete();
    await knex(tables.departement).delete();
    await knex(tables.user).delete();
    await knex(tables.employee).delete();
  },
};

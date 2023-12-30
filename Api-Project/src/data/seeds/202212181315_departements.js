const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.departement).insert([
        {
            id: 1,
            name: "Directie",
        },
        {
            id: 2,
            name: "Verzorging",
        },
        {
            id: 3,
            name: "Winkel",
        },
    ]);
  },
};

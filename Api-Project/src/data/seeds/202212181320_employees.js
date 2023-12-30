const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.employee).insert([
        {
            id: 1,
            number: 1,
            name: "Callebert",
            firstname: "Colin",
            role: "ITer",
            departementId: 1,
        },
        {
            id: 2,
            number: 2,
            name: "Moerman",
            firstname: "Jacy",
            role: "Directeur",
            departementId: 1,
        }
    ]);
  },
};

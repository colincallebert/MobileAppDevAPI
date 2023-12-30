const { tables } = require('..');
const { auth } = require('../../../config/custom-environment-variables');

module.exports = {
  seed: async (knex) => {
    await knex(tables.user).insert([
        {
            id: 1,
            email: "colin.callebert@hotmail.com",
            name: "Colin Callebert",
            birthday: "2001-04-20",
            auth0id: 'a'
        },
        {
            id: 2,
            email: "jacy.moerman@hotmail.com",
            name: "Jacy Moerman",
            birthday: "1999-01-12",
            auth0id: 'g'
        }
    ]);
  },
};

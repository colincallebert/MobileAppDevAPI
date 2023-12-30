const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.registration).insert([
      { 
        userid: 1,
        activityid: 1,
        amount: 1,
      },
      {
       
        userid: 1,
        activityid: 2,
        amount: 1,
      },
      {
       
        userid:  2,
        activityid: 1,
        amount: 3,
      },
      {
       
        userid: 2,
        activityid: 2,
        amount: 4,
      },
    ]);
  },
};

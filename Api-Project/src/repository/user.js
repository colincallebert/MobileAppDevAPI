const {
    tables,
    getKnex
} = require('../data/index');
const { getLogger } = require('../core/logging');
const { USERS } = require('../data/mock-data');
const formatUser = ({
    id,
    email,
    name,
    birthday,
    auth0id,
    ...rest
}) => ({
    ...rest,
        id: id,
        email: email,
        name: name,
        birthday: birthday,
        auth0id: auth0id,
});

const findById = async (id) => {
    const user = await getKnex()(tables.user)
        .where('id', id);
    return user[0] && formatUser(user[0]);
};
const create = async ({
    name,
    auth0id
}) => {
    try {
         await getKnex()(tables.user)
            .insert({
                name,
                auth0id
            });
        const user =  await findByAuth0Id(auth0id);
        console.log(user)
        return user;
    } catch (error) {
        const logger = getLogger();
        logger.error('Error in create', {
            error
        });
        throw error;
    }

};
const updateById = async (id, {
    email,
    name,
    birthday,
    auth0id
}) => {
    try {
        await getKnex()(tables.user)
            .update({
                email,
                name,
                birthday,
                auth0id
            })
            .where('id', id);
        return await findById(id);
    } catch (error) {
        const logger = getLogger();
        logger.error('Error in create', {
            error
        });
        throw error;
    }
};

const deleteById = async (id) => {
    try {
      const rows = await getKnex()(tables.user)
        .delete()
        .where('id', id);
      return rows > 0;
    } catch (error) {
      const logger = getLogger();
      logger.error('Error in deleteById', {
        error,
      });
      throw error;
    }
  };
  const findByAuth0Id = async (auth0id) => {
    return await getKnex()(tables.user)
      .where('auth0id', auth0id)
      .first();
  };

module.exports = {
    findById,
    create,
    updateById,
    findByAuth0Id,
    deleteById
};
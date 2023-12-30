const {
    getLogger
} = require('../core/logging');
const usersRepository = require('../repository/user');
const ServiceError = require('../core/serviceError');
let {
    USERS
} = require('../data/mock-data');

const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getLogger();
    this.logger.debug(message, meta);
};

const getById = async (id) => {
    debugLog(`Fetching user with id ${id}`);
    const user = await usersRepository.findById(id);
    return user;
};

const create = async ({
    email,
    name,
    birthday,
    auth0id
}) => {
    const user = await usersRepository.create(email,
        name,
        birthday,
        auth0id);
    debugLog('Creating new USERS', user);
    return user;
};

const updateById = async (id, {
    email,
    name,
    birthday,
    auth0id
}) => {
    debugLog(`Updating user with id ${id}`, {
        email,
        name,
        birthday,
        auth0id
    });

    const user = await usersRepository.updateById(id, {
        email,
        name,
        birthday,
        auth0id
    });
    debugLog('Update USERS', user);
    return user;
};

const deleteById = async (id) => {
    debugLog(`Deleting user with id ${id}`);
    const deleted = await usersRepository.deleteById(id);
    if (!deleted) {
        throw ServiceError.notFound(`No user with id ${id} exists`, {
            id
        });
    }
};
const register = async ({
    auth0id,
    name,
}) => {
    debugLog('Creating a new user', {
        name,
    });
    return await usersRepository.create({
        name,
        auth0id,
    });
}
const getByAuth0Id = async (auth0id) => {
    debugLog(`Fetching user with auth0id ${auth0id}`);
    const user = await usersRepository.findByAuth0Id(auth0id);

    if (!user) {
        throw ServiceError.notFound(`No user with id ${auth0id} exists`, {
            auth0id,
        });
    }

    return user;
};

module.exports = {
    getById,
    create,
    updateById,
    deleteById,
    getByAuth0Id,
    register
};
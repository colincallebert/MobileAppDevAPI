const Router = require('@koa/router');
const userService = require('../service/user');
const Joi = require('joi');
const validate = require('./_validation');
const {
    joiPasswordExtendCore
} = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
const { addUserInfo } = require('../core/auth');

const createUser = async (ctx) => {
    const newUser = await userService.create(ctx.request.body);
    ctx.body = newUser;
};

const getUserById = async (ctx) => {
    ctx.body = await userService.getById(Number(ctx.params.id));
};
const getUserByAut0id = async (ctx) => {
    let userId = 0;
    try {
        const user = await userService.getByAuth0Id(ctx.state.user.sub); 
        userId = user.id;
    } catch (err) {
        console.log(2, userId);
        await addUserInfo(ctx); 
        user = await userService.register({
            auth0id: ctx.state.user.sub,
            name: ctx.state.user.name,
        });
        userId = user.id;
    }
    ctx.body = await userService.getById(Number(userId));
    ctx.status = 200;
};

const updateUser = async (ctx) => {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    ctx.body = await userService.updateById(user.id, ctx.request.body);
};

const deleteUser = async (ctx) => {
    await userService.deleteById(ctx.params.id);
    ctx.status = 204;
};

getUserById.validationScheme = {
    params: Joi.object({
        id: Joi.number().integer().positive().required()
    }),
};
createUser.validationScheme = {
    body: Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        birthday: Joi.date().iso().less('now')
    }),
};

/**
 * Install user routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
    const router = new Router({
        prefix: '/users',
    });

    router.post('/', validate(createUser.validationScheme), createUser);
    router.put('/', updateUser);
    router.get('/me', getUserByAut0id);
    router.get('/:id', validate(getUserById.validationScheme), getUserById);
    router.delete('/:id', deleteUser);

    app.use(router.routes()).use(router.allowedMethods());
};
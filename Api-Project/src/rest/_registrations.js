const Router = require('@koa/router');
const registrationService = require('../service/registration');
const userService = require('../service/user');
const Joi = require('joi');
const validate = require('./_validation');
const {
    joiPasswordExtendCore
} = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);


const createRegistration = async (ctx) => {
    ctx.body = await registrationService.create(ctx.request.body);
};

const getRegistrationById = async (ctx) => {
    ctx.body = await registrationService.getById(1, Number(ctx.params.activityid));
};

const updateRegistration = async (ctx) => {
    ctx.body = await registrationService.updateById(1, Number(ctx.params.activityid), ctx.request.body.amount);

};

const deleteRegistration = async (ctx) => {
    ctx.body = await registrationService.deleteById(1, Number(ctx.params.activityid));
};

/**
 * Install user routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
    const router = new Router({
        prefix: '/registrations',
    });

    router.post('/', createRegistration);
    router.get('/:activityid', getRegistrationById);
    router.put('/:activityid', updateRegistration);
    router.delete('/:activityid', deleteRegistration);

    app.use(router.routes()).use(router.allowedMethods());
};
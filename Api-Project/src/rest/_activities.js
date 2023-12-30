const Router = require('@koa/router');
const activityService = require('../service/activity');
const Joi = require('joi');
const userService = require('../service/user');

const getAllActivities = async (ctx) => {
		ctx.body = await activityService.getAll();
};

const getActivityById = async (ctx) => {
	ctx.body = await activityService.getById(Number(ctx.params.id));
};

/**
 * Install activity routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
	const router = new Router({
		prefix: '/activities',
	});

	router.get('/', getAllActivities);
	router.get('/:id', getActivityById);

	app.use(router.routes()).use(router.allowedMethods());
};
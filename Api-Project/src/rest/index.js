const Router = require('@koa/router');
const installHealthRouter = require('./_health');
const installActivityRouter = require('./_activities');
const installUserRouter = require('./_users')
const installRegistrationRouter = require('./_registrations')

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
	const router = new Router({
		prefix: '/api',
	});

	installHealthRouter(router);
	installActivityRouter(router);
	installUserRouter(router);
	installRegistrationRouter(router);

	app.use(router.routes()).use(router.allowedMethods());
};

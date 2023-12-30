const {
    serializeError
} = require('serialize-error');
const ServiceError = require('./core/serviceError');
const Koa = require('koa');
const config = require('config');
const koaCors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const {
    initializeLogger,
    getLogger
} = require('./core/logging');
const {
    initializeData,
    shutdownData
} = require('./data');
const installRest = require('./rest');
const {
    checkJwtToken
} = require('./core/auth');

const NODE_ENV = config.get('env');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

module.exports = async function createServer() {
    initializeLogger({
        level: LOG_LEVEL,
        disabled: LOG_DISABLED,
        isProduction: NODE_ENV === 'production',
        defaultMeta: {
            NODE_ENV
        },
    });

    await initializeData();

    const logger = getLogger();
    const app = new Koa();

    // Add CORS
    app.use(
        koaCors({
            origin: (ctx) => {
                if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
                    return ctx.request.header.origin;
                }
                // Not a valid domain at this point, let's return the first valid as we should return a string
                return CORS_ORIGINS[0];
            },
            allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
            maxAge: CORS_MAX_AGE,
        })
    );

    app.use(checkJwtToken());

    app.use(bodyParser());

    app.use(async (ctx, next) => {
        try {
            await next();
            if (ctx.status === 404) {
                ctx.body = {
                    code: 'NOT_FOUND',
                    message: `Unknown resource: ${ctx.url}`,
                };
                ctx.status = 404;
            }
        } catch (error) {
            const logger = getLogger();
            logger.error('Error occured while handling a request', {
                error: serializeError(error),
            });
            let statusCode = error.status || 500;
            let errorBody = {
                code: error.code || 'INTERNAL_SERVER_ERROR',
                message: error.message,
                details: error.details || {},
                stack: NODE_ENV !== 'production' ? error.stack : undefined,
            };
            if (error instanceof ServiceError) {
                if (error.isNotFound) {
                    statusCode = 404;
                }

                if (error.isValidationFailed) {
                    statusCode = 400;
                }

                if (error.isUnauthorized) {
                    statusCode = 401;
                }

                if (error.isForbidden) {
                    statusCode = 403;
                }
            }
            ctx.status = statusCode;
            ctx.body = errorBody;
        }
    });

    installRest(app);

    return {
        getApp() {
            return app;
        },

        start() {
            return new Promise((resolve) => {
                const port = config.get('port');
                app.listen(port);
                logger.info(`🚀 Server listening on http://localhost:${port}`);
                resolve()
            });
        },

        async stop() {
            app.removeAllListeners();
            await shutdownData();
            getLogger().info('Goodbye');
        }
    };
};
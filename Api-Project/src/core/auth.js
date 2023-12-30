const jwksrsa = require('jwks-rsa');
const jwt = require('koa-jwt');
const axios = require('axios');
const config = require('config');

const {
	getLogger,
} = require('./logging');

function getJwtSecret() {
	const logger = getLogger();
	try {
		let secretFunction = jwksrsa.koaJwtSecret({
			jwksUri: config.get('auth.jwksUri'),
			cache: true,
			cacheMaxEntries: 5,
		});
		return secretFunction;
	} catch (error) {
		logger.error('Something went worng when handling the JWT secret', { error });
		throw error;
	}
}

function checkJwtToken() {
	const logger = getLogger();
	try {
		let secretFunction = getJwtSecret();
		return jwt({
			secret: secretFunction,
			audience: config.get('auth.audience'),
			issuer: config.get('auth.issuer'),
			algorithms: ['RS256'],
			passthrough: true,
		});
	} catch (error) {
		logger.error('Something went wrong when checking the JWT', { error });
		throw error;
	}
}
async function addUserInfo(ctx) {
    const logger = getLogger();
    try {
      const token = ctx.headers.authorization;
      const url = config.get('auth.userInfo');
      if (token && url && ctx.state.user) {
        logger.debug(`addUserInfo: ${url}, ${JSON.stringify(token)}`);
  
        const userInfo = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
  
        ctx.state.user = {
          ...ctx.state.user,
          ...userInfo.data,
        };
      }
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

module.exports = {
	checkJwtToken,
    addUserInfo,
};
const { apiKeyMiddleware } = require('../../middlewares/auth/apikey.middleware');
const authRouter = require('./v1/index');

module.exports = (router) => {
  router.use('/auth', apiKeyMiddleware, authRouter);
};

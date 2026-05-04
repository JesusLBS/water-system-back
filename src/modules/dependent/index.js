const { validJWTMiddleware } = require('../../middlewares/auth/auth.middleware');
const dependentRouter = require('./v1/index');

module.exports = (router) => {
  router.use('/admin/', validJWTMiddleware, dependentRouter);
};

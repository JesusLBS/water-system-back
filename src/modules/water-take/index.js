const { validJWTMiddleware } = require('../../middlewares/auth/auth.middleware');
const waterTakesRouter = require('./v1/index');

module.exports = (router) => {
  router.use('/admin/water-takes', validJWTMiddleware, waterTakesRouter);
};

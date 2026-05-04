const { validJWTMiddleware } = require('../../middlewares/auth/auth.middleware');
const waterLineRouter = require('./v1/index');

module.exports = (router) => {
  router.use('/admin/water-lines', validJWTMiddleware, waterLineRouter);
};

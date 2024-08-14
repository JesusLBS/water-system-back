const express = require("express");
const router = express.Router();

const userRoutes = require("./infraestructure/routes/User.router");

router.use(userRoutes);

module.exports = router;

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// define a root route
app.get("/", (req, res) => res.send("Hello World"));

module.exports = app;

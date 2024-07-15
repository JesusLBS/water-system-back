const { nodeEnv, database } = require("../../config/config");

const env = nodeEnv;
const config = require("./keys.json")[env];

module.exports = {
  username: config ? config.username : database.dbUsername,
  password: config ? config.password : database.dbPassword,
  database: config ? config.database : database.dbName,
  host: config ? config.host : database.dbHost,
  dialect: database.dbDialect,
  define: {
    timestamps: true,
    underscored: true,
  },
  timezone: "-06:00",
};

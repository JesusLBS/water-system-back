module.exports = {
  port: process.env.PORT || 4500,
  nodeEnv: process.env.NODE_ENV || "qa",
  database: {
    dbDialect: process.env.DB_DIALECT || "mysql",
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_DATABASE,
    dbHost: process.env.DB_HOST,
  },
};

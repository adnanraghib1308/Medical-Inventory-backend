"use strict";

/**
 * Return all the config from this file only
 */
const fs = require("fs"),
  nconf = require("nconf"),
  env = process.env.NODE_ENV || "development";
const isProduction = env === "production";

nconf
  .argv()
  .env()
  .file({ file: `./config/config.${env}.json` });

const config = {};

config.database = nconf.get("database");
config.mongoUrl = (() => {
  const db = nconf.get("database");
  if (["development", "staging"].includes(env)) {
    return `${db.client}://${db.connection.host}:${db.connection.port}/${db.connection.name}`;
  } else
    return `${db.client}://${db.connection.host}:${db.connection.port},${db.replica_1.host}:${db.replica_1.port},${db.replica_2.host}:${db.replica_2.port}/${db.connection.name}`;
})();

config.port = (() => {
  return nconf.get("server").port;
})();

config.jwtSecret = (() => {
  return nconf.get("jwt").key;
})();

module.exports = config;
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

config.port = (() => {
  return nconf.get("server").port;
})();

config.jwtSecret = (() => {
  return nconf.get("jwt").key;
})();

module.exports = config;

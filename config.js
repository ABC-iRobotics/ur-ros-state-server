'use strict';

require('dotenv').config();
const joi = require('@hapi/joi');

const portSchema = joi
  .number()
  .port()
  .required();

const PORT = joi.attempt(process.env.REST_PORT, portSchema);

module.exports = {
  PORT
};

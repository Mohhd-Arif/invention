const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  // NODE_ENV: Joi.string()
  //   .allow(['development', 'production', 'test', 'provision'])
  //   .default('development'),
  // PORT: Joi.number()
  //   .default(4040),
  // MONGO_URI: Joi.string(),
  // MONGO_DEBUG: Joi.boolean()
  //   .allow(['true','false'])
  //   .default(false)
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: "development",
  port: 8000,
  mongoUri: "mongodb+srv://root:!Q@W3e4r5t6yREST@restaurant.j7rtf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  mongoDebug: true
  // jwtSecret: envVars.JWT_SECRET,
};

module.exports = config;



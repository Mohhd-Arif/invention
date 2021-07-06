const config = require('./config/serverConfig');
const app = require('./config/express');
const logger = require('./config/logger');
const db = require('./config/mongo')


if (!module.parent) {
    app.listen(process.env.PORT || config.port,() => {
    logger.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

module.exports = app;

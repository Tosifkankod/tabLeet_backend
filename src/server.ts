import app from "./app";
import config from "./config/config";
import logger from "./util/logger";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  let server;
  try {
    // Database Connection
    server = app.listen(config.PORT);
    logger.info(`APPLICATION_STARTED`, {
      meta: {
        PORT: config.PORT,
        SERVER_URL: config.SERVER_URL,
      },
    });
  } catch (err) {
    logger.error(`APPLICATION_ERROR`, { meta: err });

    if (server) {
      server.close((error) => {
        if (error) {
          logger.error(`APPLICATION_ERROR`, { meta: error });
        }

        process.exit(1);
      });
    }
  }
})();

const cronTask = require('./functions/cronTask');

module.exports = ({ env }) => ({
  host: env("HOST", "127.0.0.1"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  cron: {
    // Enable or disable the cron tasks
    enabled: env.bool("CRON_ENABLED", true),
    tasks: cronTask,
  },
});

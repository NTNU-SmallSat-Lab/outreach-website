const path = require("path");

module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: env("DATABASE_FILENAME", "/tmp/outreach-strapi.db"),
    },
    useNullAsDefault: true,
  },
});

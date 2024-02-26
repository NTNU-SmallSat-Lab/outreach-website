const path = require("node:path");

module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: env("DATABASE_FILENAME", "/tmp/strapi.db")
    },
    useNullAsDefault: true,
  },
});

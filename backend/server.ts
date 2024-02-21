// Made by following https://docs.strapi.io/dev-docs/deployment/process-manager
const strapi = require("@strapi/strapi");
const app = strapi({ distDir: "./dist" });
app.start();

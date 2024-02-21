// Made by running `tsc server.js` in the backend folder
var strapi = require("@strapi/strapi");
var app = strapi({ distDir: "./dist" });
app.start();

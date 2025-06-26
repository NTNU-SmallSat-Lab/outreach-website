'use strict';

/**
 * satellite router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::satellite.satellite');

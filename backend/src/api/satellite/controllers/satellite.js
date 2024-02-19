'use strict';

/**
 * satellite controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::satellite.satellite');

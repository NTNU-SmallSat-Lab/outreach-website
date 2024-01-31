'use strict';

/**
 * infrastructure router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::infrastructure.infrastructure');

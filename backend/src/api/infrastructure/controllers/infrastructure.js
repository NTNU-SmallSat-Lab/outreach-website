'use strict';

/**
 * infrastructure controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::infrastructure.infrastructure');

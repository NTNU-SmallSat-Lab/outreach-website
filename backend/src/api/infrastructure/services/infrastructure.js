'use strict';

/**
 * infrastructure service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::infrastructure.infrastructure');

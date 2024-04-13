'use strict';

/**
 * hero service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hero.hero');

'use strict';

/**
 * hero controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::hero.hero');

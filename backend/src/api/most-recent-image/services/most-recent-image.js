'use strict';

/**
 * most-recent-image service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::most-recent-image.most-recent-image');

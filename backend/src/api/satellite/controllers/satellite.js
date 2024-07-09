'use strict';

/**
 * satellite controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::satellite.satellite', ({ strapi }) => ({
    async findOne(ctx) {
        // Fetching data from Space-Track
        const entity = await strapi.entityService.findOne('api::satellite.satellite', ctx.params.id);
        const updatedSatellite = await strapi.service('api::satellite.satellite').fetchOrbitalData(ctx.params.id);

        if (!entity.historicalOrbitalData) {
            return updatedSatellite;
        }
        
        return entity;
    }
})
);

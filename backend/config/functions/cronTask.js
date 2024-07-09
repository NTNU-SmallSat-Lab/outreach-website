// backend/config/functions/cronTask.js
/* 
 * Function to fetch data from Space-Track such as Eccentricy, SMA, Inclination every month
 * and update the database with the new data
 */
'use strict';

module.exports = {
  updateAllSatellitesData: {
    task: async ({ strapi }) => {
      try {
        // Fetching all satellites
        const satellites = await strapi.entityService.findMany('api::satellite.satellite');

        // Waiting for all promises to be resolved
        await Promise.all(
          satellites.map(async satellite => {
            await strapi.service('api::satellite.satellite').fetchOrbitalData(satellite.id);
          })
        );
      } catch (error) {
        console.error(error);
      }
    },
    options: new Date(Date.now() + 10000),
  },
};

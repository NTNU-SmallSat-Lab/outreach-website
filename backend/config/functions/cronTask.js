// backend/config/functions/cronTask.js
/* 
 * Function to fetch data from Space-Track such as Eccentricy, SMA, Inclination every month
 * and update the database with the new data
 */
'use strict';

const { fetchOrbitalData } = require('./satelliteUtils');

module.exports = {
  updateAllSatellitesData: {
    task: async ({ strapi }) => {
      try {
        // Fetching all satellites
        const satellites = await strapi.entityService.findMany('api::satellite.satellite');

        // Waiting for all promises to be resolved
        await Promise.all(
          satellites.map(async satellite => {
            try {
              setTimeout(async () => {
                await fetchOrbitalData(strapi, satellite.id);
              }, 10000);
            } catch (error) {
              console.error(error);
            }
          })
        );
      } catch (error) {
        console.error(error);
      }
    },
    options: {
      rule: "0 0 0 3 * *", // Every month on the 3rd at midnight
    },
  },
};

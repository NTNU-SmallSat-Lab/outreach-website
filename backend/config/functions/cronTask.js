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
        // Fetch all satellites
        const satellites = await strapi.entityService.findMany('api::satellite.satellite', {
          fields: ['id', 'catalogNumberNORAD'],
          filters: {
            catalogNumberNORAD: { $ne: null },
          }
        });
        await Promise.all(satellites.map(async satellite => {
          const historicalOrbitalData = await fetchOrbitalData(strapi, satellite.catalogNumberNORAD);
          await strapi.entityService.update('api::satellite.satellite', satellite.id, {
            data: {
              historicalOrbitalData: historicalOrbitalData,
            }
          })
        }));
      } catch (error) {
        console.error(error);
        return;
      }
    },
    options: {
      rule: "0 0 0 8 * *", // Every month on the 3rd at midnight
    },
  },
};

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
        await Promise.all(
          satellites.map(async (satellite) => {
          const fetchedData = await fetchOrbitalData(satellite.catalogNumberNORAD);
          return { id: satellite.id, historicalOrbitalData: fetchedData };
        })).then(async (historicalOrbitalData) => {
          await strapi.db.transaction(async (trx) => {
            // Fetch data for each satellite
            historicalOrbitalData.map(async (satellite) => {
              // Update the database with the new data
              const updatedSat = await strapi.entityService.update('api::satellite.satellite', satellite.id, {
                data: {
                  historicalOrbitalData: satellite.historicalOrbitalData,
                },
              }, { trx });
            })
          });
        })
      } catch (error) {
        console.error(error);
        return;
      }
    },
    options: {
      rule: "0 0 0 3 * *", // Every month on the 3rd at midnight
    },
  },
};

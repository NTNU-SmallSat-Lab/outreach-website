// backend/utils/satelliteUtils.js
const axios = require('axios');

async function fetchOrbitalData(strapi, contextId) {
  try {
    // Fetching the satellite
    const satellite = await strapi.entityService.findOne('api::satellite.satellite', contextId);
    const noradId = satellite.catalogNumberNORAD;

    // Authentication to Space-Track
    const authResponse = await axios.post('https://www.space-track.org/ajaxauth/login', {
      identity: 'floridg@stud.ntnu.no',
      password: 'Vm5JxTtD3-hYBdq'
    });

    if (authResponse.status === 200) {
      // Fetching data from Space-Track
      const satelliteResponse = await axios.get(`https://www.space-track.org/basicspacedata/query/class/gp_history/NORAD_CAT_ID/${noradId}/orderby/TLE_LINE1%20ASC/EPOCH/1950-07-02--2024-07-02/format/json`, {
        headers: {
          Cookie: authResponse.headers['set-cookie']
        }
      });

      if (satelliteResponse.status === 200) {
        // Collecting data
        const satelliteData = satelliteResponse.data;
        const historicalOrbitalData = satelliteData.map(data => ({
          epoch: data.EPOCH,
          inclination: data.INCLINATION,
          eccentricity: data.ECCENTRICITY,
          semiMajorAxis: data.SEMIMAJOR_AXIS
        }));

        // Updating the satellite with the new data
        const updatedSatellite = await strapi.entityService.update('api::satellite.satellite', contextId, {
          data: {
            historicalOrbitalData: historicalOrbitalData,
          },
        });
        return updatedSatellite;
      } else {
        throw new Error('Error while fetching data from Space-Track');
      }
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    console.error('Error while fetching data to Space-Track: ', error);
  }
}

module.exports = {
  fetchOrbitalData,
};

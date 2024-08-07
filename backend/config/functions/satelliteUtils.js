// backend/utils/satelliteUtils.js
const axios = require('axios');

async function fetchOrbitalData(strapi, noradId) {
  try {
    // Authentication to Space-Track
    const authResponse = await axios.post('https://www.space-track.org/ajaxauth/login', {
      identity: 'floridg@stud.ntnu.no',
      password: 'Vm5JxTtD3-hYBdq'
    });

    if (authResponse.status === 200) {
      // Fetching data from Space-Track
      const today = new Date();
      const satelliteResponse = await axios.get(`https://www.space-track.org/basicspacedata/query/class/gp_history/NORAD_CAT_ID/${noradId}/orderby/TLE_LINE1%20ASC/orderby/TLE_LINE1%20ASC/format/json`, {
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
        return historicalOrbitalData;
      }
    }
  } catch (error) {
    console.error('Error while fetching data to Space-Track: ', error);
  }
}

module.exports = {
  fetchOrbitalData,
};

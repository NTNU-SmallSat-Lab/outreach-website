'use strict';

/**
 * satellite service
 */


const { createCoreService } = require('@strapi/strapi').factories;

const axios = require('axios');

// Function to fetch data from Space-Track such as Eccentricy, SMA, Inclination
async function fetchOrbitalData(contextId) {
    try {
        // Fetching the satellite
        const satellite = await strapi.entityService.findOne('api::satellite.satellite', contextId);
        const noradId = satellite.catalogNumberNORAD;

        // Authentification to Space-Track
        const authResponse = await axios.post('https://www.space-track.org/ajaxauth/login', {
            identity: 'grauleflorian@gmail.com',
            password : 'Vm5JxTtD3-hYBdq'
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
                // Parsing correctly the data with wanted data : Inclination, Eccentricity, SMA, and Epoch
                const historicalOrbitalData = satelliteData.map(data => {
                    return {
                        epoch: data.EPOCH,
                        inclination: data.INCLINATION,
                        eccentricity: data.ECCENTRICITY,
                        semiMajorAxis: data.SEMIMAJOR_AXIS
                    }
                });

                if (satellite) {
                    // Updating the satellite with the new data
                    const updatedSatellite = await strapi.entityService.update('api::satellite.satellite', contextId, {
                        data: {
                          historicalOrbitalData: historicalOrbitalData,
                        },
                      });
                    return updatedSatellite;
                } else {
                    throw new Error('Satellite not found while updating orbit data');
                }

                
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
    ...createCoreService('api::satellite.satellite'),
    fetchOrbitalData,
};

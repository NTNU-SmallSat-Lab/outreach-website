"use strict";
const fetch = require("node-fetch");

module.exports = {
  fetchMetrics: async (ctx) => {
    const { satSQL } = ctx.request.body; // Get satellite from request parameters
    if (!satSQL) {
      return ctx.badRequest("Satellite parameter is required");
    }
    try {
      const grafanaToken = process.env.GRAFANA_BOT_TOKEN; // Grafana API token
      const grafanaHost = "https://monitoring.hypso.space"; // Grafana URL
      const datasourceId = 3;

      const baseFields = [
        { refId: "batteryVoltage", field: "vBatt", measurement: "eps" },
        { refId: "battCurrIn", field: "curBattIn", measurement: "eps" },
        { refId: "battCurrOut", field: "curBattOut", measurement: "eps" },
        { refId: "uptime", field: "uptimeInS", measurement: "eps" },
        {
          refId: "solarPanelTemp1",
          field: "solarPanelTemp1",
          measurement: "fc",
        },
        {
          refId: "solarPanelTemp2",
          field: "solarPanelTemp2",
          measurement: "fc",
        },
        {
          refId: "solarPanelTemp4",
          field: "solarPanelTemp4",
          measurement: "fc",
        },
        {
          refId: "solarPanelTemp5",
          field: "solarPanelTemp5",
          measurement: "fc",
        },
      ];
      const tempFields = [];
      for (let i = 0; i <= 13; i++) {
        if (satSQL === "hypso1" && (i === 12 || i === 13)) continue; // No ext. Board for hypso1
        if (satSQL === "hypso2" && i === 10) continue; //Skip temp_10 because it is not used for hypso2
        tempFields.push({
          refId: `tempPanelData${i}`,
          field: `temp_${i}`,
          measurement: "eps",
        });
      }

      // Combine both arrays
      const fields = [...baseFields, ...tempFields];

      const queries = fields.map((item) => ({
        refId: item.refId,
        datasourceId: datasourceId,
        resultFormat: "time_series",
        rawQuery: true,
        query: `SELECT "${item.field}" FROM "${satSQL}.${item.measurement}.GeneralTelemetry" WHERE time > now() - 7d`,
      }));

      const query = { queries };

      // Make a POST request to Grafana's datasource proxy API
      const response = await fetch(`${grafanaHost}/api/ds/query`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${grafanaToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        throw new Error(`Grafana query failed with status ${response.status}`);
      }

      const data = await response.json();

      //Returning the right name for each panel
      const createNameForTemp = (i) => {
        let name = `Panel ${i + 1}`;
        if (i <= 3) {
          name = `MPPT Conv ${i + 1}`;
        } else if (i <= 7) {
          name = `OUT Conv ${i + 1 - 4}`;
        } else if (satSQL === "hypso1" && i <= 11) {
          name = `BP ${i + 1 - 8}`;
        } else if (satSQL === "hypso2" && i <= 13) {
          if (i <= 9) {
            name = `BP ${i + 1 - 8}`;
          } else if (i === 11) {
            name = "BP 4";
          } else if (i >= 12 && i <= 13) {
            name = `Ext. Board ${i - 11}`;
          }
        }
        return name;
      };

      const values = fields.reduce((acc, item) => {
        const result = data.results[item.refId];
        if (result && result.frames && result.frames.length > 0) {
          if (item.refId.startsWith("tempPanelData")) {
            // Handling tempPanelData separately
            let i = parseInt(item.refId.replace("tempPanelData", ""), 10);
            acc[item.refId] = {
              array: result.frames[0].data.values,
              name: createNameForTemp(i), // Create name based on index
            }; // Store as an object with array and panelIndex
          } else {
            acc[item.refId] = result.frames[0].data.values; // Store as key-value pair
          }
        }
        return acc;
      }, {});
      // Return the data to the client
      ctx.send(values);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      return ctx.internalServerError(
        "Failed to fetch metrics: " + error.message
      );
    }
  },
};

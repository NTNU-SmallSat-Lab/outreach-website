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
      const datasourceId = 3; // Replace with your datasource UID

      const fields = [
        { refId: "batteryVoltage", field: "vBatt", measurement: "eps" },
        { refId: "battCurr", field: "curBattIn", measurement: "eps" },
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
          refId: "solarPanelTemp3",
          field: "solarPanelTemp3",
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
        {
          refId: "solarPanelTemp6",
          field: "solarPanelTemp6",
          measurement: "fc",
        },
      ];

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
      const values = fields.reduce((acc, item) => {
        const result = data.results[item.refId];
        if (result && result.frames && result.frames.length > 0) {
          acc[item.refId] = result.frames[0].data.values; // Store as key-value pair
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

"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/grafana-metrics",
      handler: "grafana.fetchMetrics",
      config: {
        auth: false,
      },
    },
  ],
};

"use strict";

/**
 * slack routes
 */
module.exports = {
  routes: [
    {
      method: "GET",
      path: "/slack-images",
      handler: "slack.fetchImages",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/slack-shared-url",
      handler: "slack.getSharedURL",
      config: {
        auth: false,
      },
    },
  ],
};

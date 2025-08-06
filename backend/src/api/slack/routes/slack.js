"use strict";

/**
 * slack routes
 */
module.exports = {
  routes: [
    {
      method: "POST",
      path: "/slack-images",
      handler: "slack.fetchImages",
      config: {
        auth: false,
      },
    },
  ],
};

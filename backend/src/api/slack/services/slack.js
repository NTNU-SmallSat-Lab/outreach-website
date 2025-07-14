"use strict";

const { WebClient } = require("@slack/web-api");
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

/**
 * slack service
 */

let cachedImages = null;
let cacheTimestamp = null;

module.exports = {
  fetchImagesFromSlack: async () => {
    const CACHE_DURATION = 60 * 1000; // 1 minute
    const now = Date.now();

    if (
      cachedImages &&
      cacheTimestamp &&
      now - cacheTimestamp < CACHE_DURATION
    ) {
      console.log("Returning cached images");
      return cachedImages;
    }

    try {
      const result = await slack.conversations.history({
        channel: process.env.SLACK_CHANNEL_ID,
        limit: 15,
      });
      console.log("Fetched images from Slack:", result.messages.length);
      cachedImages = result.messages.filter(
        (msg) =>
          msg.bot_profile?.name === "hypso1bot" &&
          msg.files &&
          msg.files.some((file) => file.mimetype.startsWith("image/"))
      );
      cacheTimestamp = now;
      return cachedImages;
    } catch (error) {
      console.error("Error fetching images from Slack:", error);
      throw error;
    }
  },
};

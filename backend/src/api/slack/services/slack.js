"use strict";

const { WebClient } = require("@slack/web-api");
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

/**
 * slack service
 */

module.exports = {
  fetchImagesFromSlack: async (satellite) => {
    try {
      let cursor = null;
      let hasMore = true;
      let image = null;
      while (hasMore) {
        const result = await slack.conversations.history({
          channel: process.env.SLACK_CHANNEL_ID,
          limit: 15,
          cursor: cursor,
          oldest: "0",
          inclusive: true,
        });
        if (!result.messages || result.messages.length === 0) {
          console.log("No messages found in the channel.");
          return null;
        }
        for (const message of result.messages) {
          if (message.text && message.text.includes(satellite)) {
            if (!image) {
              image = message;
              break;
            }
          }
        }
        hasMore = result.has_more;
        cursor = result.response_metadata
          ? result.response_metadata.next_cursor
          : null;
        if (image) break;
      }
      return image;
    } catch (error) {
      console.error("Error fetching images from Slack:", error);
      throw error;
    }
  },
};

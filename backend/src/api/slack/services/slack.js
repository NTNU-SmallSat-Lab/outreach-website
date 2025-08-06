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
        console.log(satellite);
        for (const message of result.messages) {
          if (message.text.includes(satellite)) {
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
        if (image) return image;
      }
    } catch (error) {
      console.error("Error fetching images from Slack:", error);
      throw error;
    }
  },
  getSharedURL: async (idImage) => {
    if (!idImage) {
      console.error("No image ID provided for sharing.");
      return;
    }
    try {
      const response = await fetch(
        "https://slack.com/api/files.sharedPublicURL",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.SLACK_USER_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file: idImage }),
        }
      );

      const data = await response.json();
      if (!data.ok && !data.error.includes("already_public")) {
        throw new Error(data.error || "Failed to make the image public");
      }
    } catch (error) {
      console.error("Error generating public URL:", error);
    }
  },
  createImageUrl: (originalURL, fileName) => {
    if (originalURL !== undefined) {
      const lastSegment = originalURL.split("/").pop();
      if (!lastSegment) return;
      const arrayInfo = lastSegment.split("-");
      const userTeam = arrayInfo[0];
      const fileId = arrayInfo[1];
      const pubSecret = arrayInfo[2];
      const fileNameLowered = fileName.toLowerCase();
      return `https://files.slack.com/files-pri/${userTeam}-${fileId}/${fileNameLowered}?pub_secret=${pubSecret}`;
    }
  },
};

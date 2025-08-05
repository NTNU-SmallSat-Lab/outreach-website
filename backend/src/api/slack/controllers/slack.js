"use strict";

/**
 * A set of functions called "actions" for `slack`
 */

// esl-lint-disable-next-line no-unused-vars
const fetchImagesFromSlack = require("../services/slack");
const fetch = require("node-fetch");

let cachedImage = null;
let cacheTimestamp = null;

module.exports = {
  fetchImages: async (ctx) => {
    const CACHE_DURATION = 60 * 1000; // 1 minute
    const now = Date.now();

    if (
      cachedImage &&
      cacheTimestamp &&
      now - cacheTimestamp < CACHE_DURATION
    ) {
      ctx.body = cachedImage;
      return;
    }
    try {
      const { satName } = ctx.request.body;

      const message = await fetchImagesFromSlack.fetchImagesFromSlack(satName);
      cachedImage = {
        success: true,
        message: {
          id: message.files[0].id,
          name: message.files[0].name,
          permalink_public: message.files[0].permalink_public,
        },
      };
      cacheTimestamp = now;
      if (message) {
        ctx.body = cachedImage;
      } else {
        ctx.body = {
          success: false,
          error: "No message found",
        };
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error.message };
    }
  },
  getSharedURL: async (ctx) => {
    const { fileId } = ctx.request.body;
    if (!fileId) {
      return ctx.badRequest("File ID is required");
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
          body: JSON.stringify({ file: fileId }),
        }
      );

      const data = await response.json();
      if (!data.ok && !data.error.includes("already_public")) {
        throw new Error(data.error || "Failed to make the image public");
      }
      ctx.send({
        message: "Image has been made public successfully",
      });
    } catch (error) {
      console.error("Error generating public URL:", error);
      ctx.internalServerError("Failed to make the image URL " + fileId);
    }
  },
};

"use strict";

/**
 * A set of functions called "actions" for `slack`
 */

// esl-lint-disable-next-line no-unused-vars
const fetchImagesFromSlack = require("../services/slack");
const fetch = require("node-fetch");

module.exports = {
  fetchImages: async (ctx) => {
    try {
      const images = await strapi
        .service("api::slack.slack")
        .fetchImagesFromSlack();
      return ctx.send(images);
    } catch (error) {
      return ctx.throw(
        500,
        "Error fetching images from Slack: " + error.message
      );
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

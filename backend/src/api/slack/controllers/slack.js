"use strict";

/**
 * A set of functions called "actions" for `slack`
 */

// esl-lint-disable-next-line no-unused-vars
const fetchImagesFromSlack = require("../services/slack");
const fetch = require("node-fetch");

let cachedImage = null;
let cacheTimestamp = null;
let cacheSat = null;

module.exports = {
  fetchImages: async (ctx) => {
    const CACHE_DURATION = 60 * 1000; // 1 minute
    const now = Date.now();
    const { satName } = ctx.request.body;
    if (
      cachedImage &&
      cacheTimestamp &&
      now - cacheTimestamp < CACHE_DURATION &&
      cacheSat === satName
    ) {
      ctx.body = cachedImage;
      return;
    }
    try {
      const message = await fetchImagesFromSlack.fetchImagesFromSlack(satName);
      const image = message ? message.files[0] : null;
      if (!image.public_url_shared) {
        await fetchImagesFromSlack.getSharedURL(image?.id);
      }
      const imageURl = fetchImagesFromSlack.createImageUrl(
        image?.permalink_public,
        image?.name
      );
      cachedImage = {
        success: true,
        image: imageURl,
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
};

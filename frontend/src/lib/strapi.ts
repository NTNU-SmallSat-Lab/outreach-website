var qs = require("qs");
import { components } from "@customTypes/strapi";

const API_URL = process.env.HOST_URL + "/api/";
const HOST_URL = process.env.HOST_URL;

export async function fetchArticlesAll() {
    let params: string = qs.stringify(
        {
            sort: ["datePublished:desc"], // Sort by date published, descending
            populate: {
                author: {
                    populate: ["avatar"],
                },
            },
        },
        { encode: false }, // Disable encoding of the query string, has to be disabled when using with Strapi
    );

    const res = await fetch(API_URL + "articles?" + params, {
        cache: "no-cache", // Disable caching during development
    });

    if (!res.ok) {
        console.log(res);
        throw new Error("Failed to fetch data:" + res.statusText);
    }

    return res.json();
}

export async function fetchArticleBySlug(slug: string) {
    let params: string = qs.stringify(
        {
            filters: { slug: { $eq: slug } },
            populate: {
                author: {
                    populate: ["avatar"],
                },
            },
        },
        { encode: false }, // Disable encoding of the query string, has to be disabled when using with Strapi
    );

    const res = await fetch(API_URL + "articles?" + params, {
        cache: "no-cache", // Disable caching during development
    });

    if (!res.ok) {
        console.log(res);
        throw new Error("Failed to fetch data:" + res.statusText);
    }

    return res.json();
}

export function getAvatarImageUrl(
    avatar: components["schemas"]["Author"]["avatar"],
) {
    if (HOST_URL && avatar && avatar && avatar.data && avatar.data[0]) {
        return HOST_URL + avatar.data[0].attributes?.url;
    }
}

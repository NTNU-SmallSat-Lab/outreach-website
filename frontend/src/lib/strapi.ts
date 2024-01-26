var qs = require("qs");

const API_URL = process.env.API_URL;

export async function getAllArticles() {
    let params: string = qs.stringify(
        {
            sort: ["datePublished:desc"], // Sort by date published, descending
            populate: "*", // Populate all relations
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

export async function getArticleBySlug(slug: string) {
    let params: string = qs.stringify(
        {
            filters: { slug: { $eq: slug } },
            populate: "*", // Populate all relations
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

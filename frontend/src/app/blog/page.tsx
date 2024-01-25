import { components } from "@customTypes/strapiTypes";

async function getData() {
    const res = await fetch("http://localhost:1337/api/articles", {
        cache: "no-cache", // Disable caching during development
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data:" + res.statusText);
    }

    return res.json();
}

export default async function BlogPage() {
    const response = await getData();
    const data: components["schemas"]["ArticleListResponseDataItem"][] =
        response.data;

    console.log(response.data);

    return (
        <div>
            <h1>Blog</h1>
            {data.map((post) => {
                return (
                    <div key={post.id}>
                        <h2>{post.attributes?.Title}</h2>
                        <h3>{post.attributes?.Subtitle}</h3>
                        <p>
                            {(post.attributes?.Body as any)[0].children[0].text}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

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
    const data = response.data;

    console.log(response.data);

    return (
        <div>
            <h1>Blog</h1>
            {data.map((post: any) => {
                return (
                    <div key={post.id}>
                        <h2>{post.attributes.Title}</h2>
                        <p>{post.attributes.Body[0].children[0].text}</p>
                    </div>
                );
            })}
        </div>
    );
}

import { test, expect } from "@playwright/experimental-ct-react";
import FullBlogCard from "@/components/fullBlogCard";
import { BlogPost } from "@/app/blog/page";
import { Enum_Article_Tag } from "@/__generated__/graphql";

test("FullBlogCard renders correctly", async ({ mount }) => {
    const mockArticle: BlogPost = {
        key: "mock-key",
        title: "Mock Article Title",
        content: [
            {
                type: "paragraph",
                children: [
                    {
                        type: "text",
                        text: "Mock article content preview text...",
                    },
                ],
            },
        ],
        coverImage: "mock-cover-image.jpg",
        datePublished: "2024-04-13",
        tag: Enum_Article_Tag.Projects,
        slug: "mock-article-slug",
    };
    // Mount the FullBlogCard component with mock data
    const component = await mount(<FullBlogCard article={mockArticle} />);

    //Check if the component is visible
    await expect(component).toBeVisible();

    //Check if title is correct
    await expect(component.getByTestId("blogCardLink")).toContainText(
        "Mock Article Title",
    );

    //Check if preview text for blog is visible
    await expect(
        component.getByText("Mock article content preview text..."),
    ).toBeVisible();

    //Wait for the image to actually have its src attribute set with the real image URL
    await expect(component.getByRole('img')).toHaveAttribute('src', /mock-cover-image\.jpg/);

    //Check if datePublished is visible
    await expect(component.getByText("April 13, 2024")).toBeVisible();

    //Check if the tag is correct
    await expect(component.getByTestId("articleTag")).toHaveText("Projects");

    //Check if the urls on the links are correct
    await expect(component.getByTestId("blogCardLink")).toHaveAttribute(
        "href",
        "/blog/mock-article-slug",
    );

    await expect(component.getByText("Read more")).toHaveAttribute(
        "href",
        "/blog/mock-article-slug",
    );
});

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/card";
import { getClient } from "@/lib/ApolloClient";
import Link from "next/link";
import Image from "next/image";
import { SlicePreviewText } from "@/components/SlicePreviewText";
import {
    PageHeader,
    PageHeaderAndSubtitle,
    PageSubtitle,
} from "@/components/PageHeader";
import { PlaceholderImage } from "@/components/fullBlogCard";
import { graphql } from "@/tada/graphql";
import { PagePadding } from "@/components/PageLayout";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import ProjectCards from "@/components/ProjectCards";

const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;

const GET_PROJECTS = graphql(`
    query GET_PROJECTS {
        projects(sort: ["publishedAt:desc"]) {
            data {
                id
                attributes {
                    title
                    content
                    slug
                    previewImage {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`);

interface PreviewImageAttributes {
    url: string | null;
}

interface PreviewImageData {
    data: {
        attributes: PreviewImageAttributes | null;
    } | null;
}

interface ProjectAttributes {
    title: string;
    content: BlocksContent;
    slug: string;
    previewImage: PreviewImageData | null;
}

export interface ProjectPost {
    id: string | null;
    attributes: ProjectAttributes;
}

export default async function ProjectsPage() {
    const graphqlData = await getClient().query({
        query: GET_PROJECTS,
    });

    if (
        graphqlData.data === null ||
        graphqlData.data === undefined ||
        graphqlData.data.projects === undefined ||
        graphqlData.data.projects === null
    ) {
        return <div>There are no projects to show.</div>;
    }

    return (
        <>
            <PagePadding>
                <PageHeaderAndSubtitle>
                    <PageHeader>Projects</PageHeader>
                    <PageSubtitle>
                        Here you can find all of the projects we are working on.
                    </PageSubtitle>
                </PageHeaderAndSubtitle>
                <div className="flex flex-col justify-center">
                    <ProjectCards
                        projects={
                            graphqlData.data.projects.data as ProjectPost[]
                        }
                    />
                </div>
            </PagePadding>
        </>
    );
}

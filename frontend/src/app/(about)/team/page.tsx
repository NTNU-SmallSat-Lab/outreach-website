export const runtime = "edge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { getClient } from "@/lib/ApolloClient";
import { gql } from "@/__generated__/gql";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const GET_PROJECTS = gql(`
query PhDProjects {
    phDProjects {
    data {
        attributes {
        name
        title
        keywords
        reatedAt
        updatedAt
        publishedAt
        }
        id
    }
    }
}
`);

const GET_PEOPLE = gql(`
query People {
    people {
    data {
        id
        attributes {
        name
        workTitle
        employeeLink
        profilePicture {
            data {
            attributes {
                url
            }
            id
            }
        }
        profilePictureURL
        reatedAt
        updatedAt
        publishedAt
        role
        }
    }
    }
}
`);

export default async function TeamPage() {
    const graphqlData = await getClient().query({
        query: GET_PROJECTS,
    });

    const projectsData = graphqlData?.data?.phDProjects?.data || [];

    if (projectsData.length === 0) {
        return <div>There are no projects to show.</div>;
    }

    return (
        <div>
            <h1>Team</h1>
            <Table>
                <TableCaption>Ongoing PhD Projects</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Title(PhD title)</TableHead>
                        <TableHead>Keywords</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projectsData.map((project) => {
                        const name = project.attributes?.name || "";
                        const title = project.attributes?.title || "";
                        const keywords = project.attributes?.keywords || "";

                            <TableRow>
                                <TableCell className="font-medium">
                                    {name}
                                </TableCell>
                                <TableCell>{title}</TableCell>
                                <TableCell>{keywords}</TableCell>
                            </TableRow>,
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

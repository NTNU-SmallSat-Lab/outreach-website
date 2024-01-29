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
        <div className="text-center">
            <h1 className="mb-4 font-bold">MEET THE TEAM</h1>
            <h1 className="mb-4">RESEARCHERS</h1>
            <h1 className="mb-4">PHD CANDIDATES</h1>
            <h1 className="mb-4">ENGINEERS</h1>
            <h1 className="mb-4">CONTACT US</h1>
            <div className="overflow-x-auto">
                <h1 className="mb-4">Ongoing PhD Projects</h1>
                <Table className="w-full border border-collapse border-gray-400">
                    <TableCaption>Ongoing PhD Projects</TableCaption>
                    <TableHeader>
                        <TableRow className="border-b">
                            <TableHead className="border-r">Name</TableHead>
                            <TableHead className="border-r">Title (PhD title)</TableHead>
                            <TableHead>Keywords</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projectsData.map((project, index) => {
                            const name = project.attributes?.name || "";
                            const title = project.attributes?.title || "";
                            const keywords = project.attributes?.keywords || "";
                            return (
                                <TableRow key={index}>
                                    <TableCell className="border-r">{name}</TableCell>
                                    <TableCell className="border-r">{title}</TableCell>
                                    <TableCell>{keywords}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

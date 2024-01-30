export const runtime = "edge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

    const graphqlPeopleData = await getClient().query({
        query: GET_PEOPLE,
    });

    const peopleData = graphqlPeopleData?.data?.people?.data || [];

    const filterPeopleByRole = (role: string) => {
        return peopleData.filter(person => person.attributes?.role.replace('_', ' ') === role);
    };
    return (
        <div className="text-center">
            {peopleData.length == 0 ? (
                <div>There are no team members to show.</div>
            ) : (
                <div>
                    <h1 className="col-span-full text-3xl font-bold mb-10 mt-5">MEET THE TEAM</h1>
                    {['Researchers', 'PhD candidates', 'Engineers', 'Contact us'].map((role, index) => (
                        <div key={index} className="mb-8"> {/* Add margin bottom */}
                            <h1 className="mb-2 col-span-full text-xl font-bold">{role}</h1> {/* Increase margin bottom and adjust font size */}
                            <div className="grid grid-cols-2 gap-4 lg:max-w-4xl lg:mx-auto">
                                {filterPeopleByRole(role || "").map((person, index) => {
                                    const name = person.attributes?.name || "";
                                    const employeeLink = person.attributes?.employeeLink || "";
                                    const workTitle = person.attributes?.workTitle || "";
                                    const profilePictureURL = person.attributes?.profilePictureURL || "";

                                    return (
                                        <Link
                                            href={employeeLink}
                                            target="_blank"
                                            key={name + index}
                                            className="hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
                                        >
                                            <Card className="bg-neutral-50 w-full">
                                                <CardHeader>
                                                    <CardTitle className="text-black">
                                                        <p>{name}</p>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="flex items-center">
                                                    <Avatar className="w-16 h-16 mr-4">
                                                        <AvatarImage src={profilePictureURL} />
                                                        <AvatarFallback>
                                                            {name}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="sm:ml-0 md:ml-5 lg:ml-10">
                                                        <h1 className="text-gray-500">{workTitle}</h1>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}


                </div>
            )}
            {projectsData.length == 0 ? (
                <div>There are no projects to show.</div>
            ) : (
                <div className="overflow-x-auto">
                    <h1 className="text-3xl font-bold mb-10 mt-5">Ongoing PhD Projects</h1>
                    <Table className="w-full border border-collapse border-gray-400">
                        <TableCaption>Ongoing PhD Projects</TableCaption>
                        <TableHeader>
                            <TableRow className="border-b">
                                <TableHead className="border-r">Name</TableHead>
                                <TableHead className="border-r">
                                    Title (PhD title)
                                </TableHead>
                                <TableHead>Keywords</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projectsData.map((project, index) => {
                                const name = project.attributes?.name || "";
                                const title = project.attributes?.title || "";
                                const keywords =
                                    project.attributes?.keywords || "";
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="border-r">
                                            {name}
                                        </TableCell>
                                        <TableCell className="border-r">
                                            {title}
                                        </TableCell>
                                        <TableCell>{keywords}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}

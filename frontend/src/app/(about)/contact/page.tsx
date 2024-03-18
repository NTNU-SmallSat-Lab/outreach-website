export const runtime = "edge";
import { ContactCard } from "@/components/ContactCard";
import { getClient } from "@/lib/ApolloClient";
import { gql } from "@/__generated__/gql";

const GET_PEOPLE = gql(`
query GET_PEOPLE {
    people {
        data {
          attributes {
            createdAt
            employeeLink
            name
            profilePicture {
              data {
                attributes {
                  alternativeText
                  previewUrl
                  url
                }
                id
              }
            }
            workTitle
          }
        }
      }
  }
`);

export default async function ContactPage() {
    const people = await getClient().query({
        query: GET_PEOPLE,
    });

    const content = people?.data?.people?.data ?? [];

    return (
        <div className="flex h-full items-start justify-center">
            <div className="mx-auto flex h-full max-w-7xl flex-wrap items-start justify-center">
                {content.map((person, index) => (
                    <ContactCard
                        key={index}
                        imageUrl={
                            process.env.HOST_URL +
                            (person?.attributes?.profilePicture?.data
                                ?.attributes?.url ?? "")
                        }
                        name={person?.attributes?.name}
                        role={person.attributes?.workTitle}
                        externalUrl={person.attributes?.employeeLink as string}
                    />
                ))}
            </div>
        </div>
    );
}

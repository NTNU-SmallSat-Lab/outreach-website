export const runtime = "edge";
import { ContactCard } from "@/components/ContactCard";
import { Separator } from "@/components/ui/separator";
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
        <div className="flex justify-center items-start h-full">
            <div className="flex flex-wrap justify-center items-start h-full max-w-7xl mx-auto">
                {content.map((person, index) => (
                    <ContactCard
                        key={index}
                        imageUrl={process.env.HOST_URL + (person?.attributes?.profilePicture?.data?.attributes?.url ?? '')}
                        name={person.attributes?.name}
                        role={person.attributes?.workTitle}
                        externalUrl={person.attributes?.employeeLink as string}
                    />
                ))}
            </div>
        </div>
    );
}

export const runtime = "edge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { getClient } from "@/lib/ApolloClient";
import { gql } from "@/__generated__/gql";
const HOST_URL = process.env.HOST_URL as string;
const GET_PARTNERS = gql(`
query GET_PARTNERS {
    partners {
      data {
        attributes {
          partnerName
          logoUrl
          websiteUrl
          logoImage {
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

export default async function PartnersPage() {
    const graphqlData = await getClient().query({
        query: GET_PARTNERS,
    });

    const partnersData = graphqlData?.data?.partners?.data || [];

    if (partnersData.length === 0) {
        return <div>There are no partners to show.</div>;
    }

    return (
        <div className="flex flex-col items-center text-center">
            <h1 className="mb-10 mt-5 text-3xl font-bold">
                Partners and Collaborators
            </h1>
            {partnersData.map((partner) => {
                let logoUrl = partner.attributes?.logoUrl || "";
                if (partner.attributes?.logoImage?.data?.attributes?.url) {
                    logoUrl =
                        HOST_URL +
                        partner.attributes.logoImage.data.attributes.url;
                }
                const websiteUrl = partner.attributes?.websiteUrl || "";
                const partnerName = partner.attributes?.partnerName || "";

                return (
                    <Link
                        href={websiteUrl}
                        target="_blank"
                        key={partnerName}
                        className="mx-auto w-full max-w-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:transform"
                    >
                        <Card className="mb-6 bg-neutral-50">
                            <CardHeader>
                                <CardTitle className="text-black">
                                    <p>{partnerName}</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {logoUrl !== "" ? (
                                    <Image
                                        className="max-h-[75px]"
                                        src={logoUrl}
                                        alt={partnerName}
                                        width={500}
                                        height={0}
                                    />
                                ) : (
                                    <h1 className="text-gray-500">No Logo</h1>
                                )}
                            </CardContent>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}

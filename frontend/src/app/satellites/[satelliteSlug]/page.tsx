export const runtime = "edge";
import BlockRendererClient from "@/components/BlockRendererClient";
const HOST_URL = process.env.HOST_URL;
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import fetchSatelliteInfo from "@/lib/data/fetchSatelliteInfo";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import SatelliteDataTable from "@/components/satelliteData/SatelliteDataTableMultiple";

export interface SatelliteInfo {
    name: string;
    content: BlocksContent;
    imageURL: string;
    relatedProjects?: Projects[];
}

export interface Projects {
    id: string;
    title: string;
    coverImage: string;
    slug: string;
}

export default async function SatelliteInfoPage({
    params,
}: {
    params: { satelliteSlug: string };
}) {
    try {
        const satelliteInfo: SatelliteInfo = await fetchSatelliteInfo({
            params: params,
        });

        return (
            <div className="flex w-full flex-col content-center justify-center ">
                <div className="m-20 flex w-3/4 flex-col items-center self-center border border-solid border-white bg-background drop-shadow-[0_0px_20px_rgba(255,255,255,0.25)]">
                    <h1 className="mt-4 text-2xl font-bold">
                        {satelliteInfo.name}
                    </h1>
                    <div className="flex flex-row">
                        {satelliteInfo.imageURL && (
                            <Image
                                src={satelliteInfo.imageURL}
                                alt={satelliteInfo.imageURL}
                                width={200}
                                height={0}
                                className="margin p-2"
                            />
                        )}
                        <SatelliteDataTable satName={satelliteInfo.name} />
                    </div>
                    <div className="w-full">
                        <div className="m-10 flex flex-col content-center justify-center">
                            <h1 className="cent mt-2 text-center text-2xl font-bold">
                                Map
                            </h1>
                            <div className="flex content-center justify-center p-10">
                                <Image
                                    src={`https://static.vecteezy.com/system/resources/thumbnails/023/485/593/small/world-map-silhouette-png.png`}
                                    alt="World Map"
                                    width={500}
                                    height={200}
                                />
                            </div>
                            <div className="w-2/3 self-center break-words">
                                <BlockRendererClient
                                    content={satelliteInfo.content}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="m-20 flex w-3/4 flex-col items-center self-center border border-solid border-white bg-background p-10 drop-shadow-[0_0px_20px_rgba(255,255,255,0.25)]">
                    {satelliteInfo.relatedProjects?.length != 0 ? (
                        <h1 className="mb-2 mt-2 text-xl font-bold">
                            Related Projects
                        </h1>
                    ) : null}

                    {satelliteInfo.relatedProjects?.map((project: Projects) => {
                        let coverImage = project.coverImage;
                        if (HOST_URL && coverImage != undefined) {
                            coverImage = HOST_URL + coverImage;
                        }
                        return (
                            <Link
                                className="m-1 transition-transform duration-300 ease-in-out hover:scale-110 hover:transform sm:m-4"
                                href={"/projects/" + project.slug}
                                key={project.id}
                            >
                                <Card className="md:w-68 flex h-full w-64 flex-col lg:w-72">
                                    <CardHeader>
                                        <CardTitle className="mb-2 mt-2 text-center text-xl font-bold">
                                            {project.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-48">
                                            {coverImage && (
                                                <Image
                                                    className="max-h-full max-w-full object-contain"
                                                    src={coverImage}
                                                    alt={coverImage}
                                                    width={500}
                                                    height={0}
                                                />
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching satellite info:", error);
        return <div>Error fetching satellite info</div>;
    }
}

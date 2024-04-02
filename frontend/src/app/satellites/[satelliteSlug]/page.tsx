export const runtime = "edge";
import BlockRendererClient from "@/components/BlockRendererClient";
import SatelliteFetcher from "@/components/map/SatelliteFetcher";
const HOST_URL = process.env.HOST_URL;
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import fetchSatelliteInfo from "@/lib/data/fetchSatelliteInfo";
import { BlocksContent } from "@strapi/blocks-react-renderer";


export interface SatelliteInfo {
    name: string;
    content: BlocksContent;
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

        const satelliteInfo: SatelliteInfo = await fetchSatelliteInfo({ params: params });
        
        return (
            <div className="flex flex-col items-center">
                <SatelliteFetcher
                    useExampleData={true}
                    filterList={[
                        satelliteInfo.name,
                    ]}
                />
                <h1 className="mt-4 text-2xl font-bold">
                    {satelliteInfo.name}
                </h1>
                <div className="gap-1">
                            <h1>Altitude: {"1234"}km</h1>
                            <h1>Speed: {"1223"}km/s</h1>
                            <h1>Latitude: {"24.65"}°</h1>
                            <h1>Longitude: {"26.12"}°</h1>
                        </div>
                <BlockRendererClient content={satelliteInfo.content} />
                {satelliteInfo.relatedProjects?.length != 0 ? (
                    <h1 className="mb-2 mt-2 text-xl font-bold">Related Projects</h1>
                 ) : null}


                {satelliteInfo.relatedProjects?.map((project : Projects) => {
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
                }
                )}

            </div>
        );
    } catch (error) {
        console.error("Error fetching satellite info:", error);
        return <div>Error fetching satellite info</div>;
    }
}

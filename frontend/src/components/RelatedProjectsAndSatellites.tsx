import { ProjectOrSatellite } from "@/app/satellites/[satelliteSlug]/page";
import Link from "next/link";
import Image from "next/image";
const HOST_URL = process.env.HOST_URL;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RelatedProjectsAndSatellites({
    project,
}: {
    project: ProjectOrSatellite;
}) {
    let previewImage = project.previewImage;
    if (HOST_URL && previewImage != undefined) {
        previewImage = HOST_URL + previewImage;
    }
    const projectOrSatellite = project.isProject ? "projects" : "satellites";

    return (
        <Link
            className="m-1 transition-transform duration-300 ease-in-out hover:scale-110 hover:transform sm:m-4"
            href={"/" + projectOrSatellite + "/" + project.slug}
            key={project.id}
        >
            <Card className="md:w-68 flex h-full w-64 flex-col">
                <CardHeader>
                    <CardTitle className="mb-2 mt-2 text-center text-xl font-bold">
                        {project.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-48">
                        {previewImage && (
                            <Image
                                className="max-h-full max-w-full object-contain"
                                src={previewImage}
                                alt={previewImage}
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
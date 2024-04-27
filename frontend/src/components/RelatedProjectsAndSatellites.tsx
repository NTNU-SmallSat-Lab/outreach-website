import { ProjectOrSatellite } from "@/app/satellites/[satelliteSlug]/page";
import Link from "next/link";
import Image from "next/image";
const STRAPI_URL = process.env.BACKEND_INTERNAL_URL;
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shadcn/card";
import { PlaceholderImage } from "@/components/fullBlogCard";

export default function RelatedProjectsAndSatellites({
    project,
}: {
    project: ProjectOrSatellite;
}) {
    let previewImage = project.previewImage;
    if (STRAPI_URL && previewImage != undefined) {
        previewImage = STRAPI_URL + previewImage;
    }
    const projectOrSatellite = project.isProject ? "projects" : "satellites";

    return (
        <Link
            className="m-1 sm:m-4"
            href={"/" + projectOrSatellite + "/" + project.slug}
            key={project.id}
        >
            <Card className="md:w-68 flex h-full w-64 flex-col hover:border-blue-500">
                <CardHeader>
                    <CardTitle className="mb-2 mt-2 text-center text-xl font-bold">
                        {project.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-48">
                        {previewImage ? (
                            <Image
                                className="max-h-full max-w-full object-contain"
                                src={previewImage}
                                alt={previewImage}
                                width={500}
                                height={0}
                            />
                        ) : (
                            <div className="m-0 flex aspect-video max-h-full max-w-full items-center justify-center object-contain">
                                <PlaceholderImage />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

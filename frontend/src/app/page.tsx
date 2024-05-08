import TeamSection from "./_homeComponents/TeamSection";
import FeaturedProjects from "./_homeComponents/FeaturedProjects";
import MissionStatement from "./_homeComponents/MissionStatement";
import fetchFeaturedImage from "@/lib/data/fetchFeaturedImage";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const featuredImage = await fetchFeaturedImage();

    return (
        <>
            {/* Mission Statement Section */}
            <MissionStatement />

            {/* Projects Section */}
            <FeaturedProjects />

            {/* Team Section */}
            <TeamSection />

            <div className="flex w-full flex-col items-center justify-center p-4 text-center">
                <div className="prose prose-invert">
                    <h2>
                        Image Taken by{" "}
                        <Link
                            href={`/satellites/${featuredImage.imageSatelliteSlug}`}
                            className="text-primary no-underline hover:underline"
                        >
                            {featuredImage.imageSatelliteName}
                        </Link>
                    </h2>
                </div>
                <div className="mt-8 flex w-full overflow-hidden">
                    <Image
                        alt="Featured Satellite Image"
                        src={featuredImage.featuredImageURL}
                        width={900}
                        height={600}
                        className="bg-black-900 w-full object-contain"
                    />
                </div>
            </div>
        </>
    );
}

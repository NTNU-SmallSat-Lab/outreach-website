import TeamSection from "@/components/TeamSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import MissionStatement from "@/components/MissionStatement";
import GlobePage from "@/app/globe/page";

export default function Home() {
    return (
        <>
            {/* Mission Statement Section */}
            <MissionStatement />

            {/* Projects Section */}
            <FeaturedProjects />

            {/* Globe Section */}
            <GlobePage />

            {/* Contact Section */}
            <TeamSection />
        </>
    );
}

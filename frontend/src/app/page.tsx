import TeamSection from "@/components/TeamSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import MissionStatement from "@/components/MissionStatement";
import GlobeWithStats from "@/components/homeComponents/GlobeWithStats";

export default function Home() {
    return (
        <div>
            {/* Mission Statement Section */}
            <MissionStatement />

            {/* Projects Section */}
            <FeaturedProjects />

            {/* Team Section */}
            <TeamSection />

            {/* Globe Section */}
            <GlobeWithStats homePage={true} />
        </div>
    );
}

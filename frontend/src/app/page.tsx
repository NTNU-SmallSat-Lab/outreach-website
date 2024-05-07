import TeamSection from "./_homeComponents/TeamSection";
import FeaturedProjects from "./_homeComponents/FeaturedProjects";
import MissionStatement from "./_homeComponents/MissionStatement";
import GlobeWithStats from "./_homeComponents/GlobeWithStats";

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

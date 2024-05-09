import TeamSection from "./_homeComponents/TeamSection";
import FeaturedProjects from "./_homeComponents/FeaturedProjects";
import MissionStatement from "./_homeComponents/MissionStatement";
import FeaturedImage from "./_homeComponents/FeaturedImage";
import GlobeWithStats from "./_homeComponents/GlobeWithStats";
import ScrollIndicator from "./_homeComponents/ScrollIndicator";

export default async function Home() {
    return (
        <>
            <ScrollIndicator></ScrollIndicator>
            {/* Globe */}

            <GlobeWithStats />

            {/* Mission Statement Section */}
            <MissionStatement />

            {/* Projects Section */}
            <FeaturedProjects />

            {/* Team Section */}
            <TeamSection />

            {/* Featured image */}
            <FeaturedImage />
        </>
    );
}

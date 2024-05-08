import fetchMissionStatement from "@/lib/data/fetchMissionStatement";

import Hero from "@/components/ui/hero";

export default async function MissionStatement() {
    const missionStatement = await fetchMissionStatement();

    return (
        <Hero
            title={missionStatement.title}
            description={missionStatement.textContent}
        ></Hero>
    );
}

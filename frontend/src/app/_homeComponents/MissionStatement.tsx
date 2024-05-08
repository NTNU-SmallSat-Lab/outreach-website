import fetchMissionStatement from "@/lib/data/fetchMissionStatement";

import Hero from "@/components/ui/hero";
import { PagePaddingOnlyHorizontal } from "@/components/layout/PageLayout";

export default async function MissionStatement() {
    const missionStatement = await fetchMissionStatement();

    return (
        <PagePaddingOnlyHorizontal>
            <Hero
                title={missionStatement.title}
                description={missionStatement.textContent}
            ></Hero>
        </PagePaddingOnlyHorizontal>
    );
}

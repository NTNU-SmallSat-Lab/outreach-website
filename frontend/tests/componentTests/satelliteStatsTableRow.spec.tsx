import SatelliteStatsTableRow from "@/components/satelliteData/SatelliteStatsTableRow";
import { test, expect } from "@playwright/experimental-ct-react";

// Mock satellite data
const mockSatellite = {
    id: "satelliteId",
    name: "Satellite Name",
    previewImage: "Satellite Image",
    slug: "SatelliteSlug",
};

test("should be clickable", async ({ mount }) => {
    const component = await mount(
        <SatelliteStatsTableRow
            satName={mockSatellite.name}
            handleRowClick={() => {}}
        />,
    );

    await expect(component).toContainText("Satellite Name");

    // Click the row
    await component.click();
});

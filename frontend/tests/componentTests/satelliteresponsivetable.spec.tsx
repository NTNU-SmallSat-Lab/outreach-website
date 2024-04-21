import { test, expect } from "@playwright/experimental-ct-react";
import SatelliteResponsiveTable from "@/components/SatelliteResponsiveTable";
import globeData from "@components/homeComponents/files/globe-data.json";

console.log(globeData);
test("SatelliteResponsiveTable renders correctly", async ({ mount }) => {
    // Mock satellite data
    const satellites = [
        {
            id: 1,
            attributes: {
                name: "Satellite 1",
                slug: "satellite-1",
            },
        },
        {
            id: 2,
            attributes: {
                name: "Satellite 2",
                slug: "satellite-2",
            },
        },
    ];

    // Mount the SatelliteResponsiveTable component with mock data
    const component = await mount(
        <SatelliteResponsiveTable satellites={satellites} />,
    );

    // Check if the page header and subtitle are rendered correctly
    await expect(component.getByTestId("pageHeader")).toContainText(
        "Satellites",
    );
    await expect(component.getByTestId("pageSubtitle")).toContainText(
        "Here are the satellites we have worked on. Click on them to see more details.",
    );

    // Check if the table headers are rendered correctly
    await expect(component).toContainText("Satellite");
    await expect(component).toContainText("Speed");
    await expect(component).toContainText("Altitude");
    await expect(component).toContainText("Latitude");
    await expect(component).toContainText("Longitude");

    // Check if the satellite data rows are rendered correctly
    await expect(component).toContainText("Satellite 1");
    await expect(component).toContainText("Satellite 2");
});

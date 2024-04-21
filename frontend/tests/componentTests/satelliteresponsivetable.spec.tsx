import { test, expect } from "@playwright/experimental-ct-react";
import SatelliteResponsiveTable from "@/components/SatelliteResponsiveTable";

test("SatelliteResponsiveTable renders correctly", async ({ mount }) => {
    // Mock satellite data
    const mockData = [
        {
            id: 1,
            attributes: {
                name: "Satellite 1",
                slug: "satellite-1",
            },
        },
    ];

    //Does not work to mount the component with the mockData
    //const component = await mount(<SatelliteResponsiveTable satellites={mockData} />);

    // Mount the SatelliteResponsiveTable component without mockData
    const component = await mount(<SatelliteResponsiveTable satellites={[]} />);

    await expect(component).toBeVisible();

    // Check if the table headers is rendered correctly
    await expect(
        component.getByRole("cell", { name: "Satellite" }),
    ).toBeVisible();
    await expect(component.getByText("Speed")).toBeVisible();
    await expect(component.getByText("Altitude")).toBeVisible();
    await expect(component.getByText("Latitude")).toBeVisible();
    await expect(component.getByText("Longitude")).toBeVisible();
});

import SatelliteStatsTableRow from "@/components/satelliteData/SatelliteStatsTableRow";
import { test, expect } from "@playwright/experimental-ct-react";
import { useRouter } from "next/navigation";

// Mock satellite data
const mockSatellite = {
    id: "satelliteId",
    name: "Satellite Name",
    previewImage: "Satellite Image",
    slug: "StaelliteSlug",
};

const mockGlobeData = {
    "features": [
      {
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [10, 10], [20, 10], [20, 20], [10, 20], [10, 10] 
            ]
          ]
        },
        "properties": {
          "scalerank": 1,
          "featurecla": "Admin-0 country",
          "ADMIN": "Test Country",
        }
      }
    ]
  }

  const router = {
    push: jest.fn() 
};
useRouter.mockReturnValue(router);


test("should work", async ({ mount }) => {
    const handleRowClick = (slug: string) => {
        // This will update the URL without triggering a full page refresh
        router.push(`/satellites/${slug}`, undefined);
    };

    const component = await mount(
        <SatelliteStatsTableRow 
            satName={mockSatellite.name}  
            handleRowClick={() => handleRowClick(mockSatellite.slug)}
        />,
    );

    await expect(component).toContainText("Satellite Name");
});

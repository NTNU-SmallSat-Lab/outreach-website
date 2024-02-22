import dynamic from "next/dynamic";
const GHGlobe = dynamic(() => import("@components/map/githubglobe/GHGlobe"), {
    ssr: false,
});

// Example Datasources
import { exampleData } from "@components/map/exampleSatData";
import { SatelliteData, mapRawDataToSatData } from "@/lib/mapHelpers";

const FETCH_EXAMPLE_DATA = true;
const SATELLITE_AMOUNT = 50; // amount of satellites to display

export default async function Page() {
    let satDatas: SatelliteData[] = [];
    if (FETCH_EXAMPLE_DATA) {
        satDatas = mapRawDataToSatData(exampleData);
    }

    satDatas = satDatas.slice(0, SATELLITE_AMOUNT);

    return <GHGlobe satDatas={satDatas}></GHGlobe>;
}

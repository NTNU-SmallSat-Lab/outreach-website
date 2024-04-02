import GeoMercator from "./GeoMercator";

export default function Map2d() {
    const width = 960;
    const height = width / 2;

    return (
        <div className="h-full w-full flex justify-center">
            <GeoMercator width={width} height={height} />
        </div>
    );
}

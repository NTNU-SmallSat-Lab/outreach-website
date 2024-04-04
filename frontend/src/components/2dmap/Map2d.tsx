import GeoCustom from "./2dMapProjection";

export default function Map2d() {
    const width = 960;
    const height = width / 2;

    return (
        <div className="h-full w-full flex justify-center">
            <GeoCustom width={width} height={height} />
        </div>
    );
}

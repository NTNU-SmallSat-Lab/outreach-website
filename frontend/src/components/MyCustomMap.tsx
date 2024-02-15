"use client";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

// Fix for marker not showing, as it is not included in react leaflet, and has problems with next.js
import L from "leaflet";
import { useEffect } from "react";
import { useTheme } from "next-themes";
L.Icon.Default.imagePath = "leaflet_images/";

function MyComponent() {
    let Jawg_Light = L.tileLayer(
        "https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}",
        {
            minZoom: 0,
            maxZoom: 22,
            accessToken:
                "HCn5CjLZedBd6iiWPYVXB2iGcuZbJtMyuf40nxcHtFjSnBmSMGnsfY61rDtfjqCF",
        },
    );
    let Jawg_Dark = L.tileLayer(
        "https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}",
        {
            minZoom: 0,
            maxZoom: 22,
            accessToken:
                "HCn5CjLZedBd6iiWPYVXB2iGcuZbJtMyuf40nxcHtFjSnBmSMGnsfY61rDtfjqCF",
        },
    );
    const map = useMap();

    const { theme, setTheme } = useTheme();

    useEffect(() => {
        if (theme === "dark") {
            Jawg_Dark.addTo(map);
        } else {
            Jawg_Light.addTo(map);
        }
    }, [theme]);

    return null;
}

export default function MyCustomMap() {
    var southWest = L.latLng(-89.98155760646617, -180);
    var northEast = L.latLng(89.99346179538875, 180);
    var bounds = L.latLngBounds(southWest, northEast);
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={2}
            scrollWheelZoom={false}
            attributionControl={false}
            zoomControl={false}
            maxBoundsViscosity={1.0}
            maxBounds={bounds}
            doubleClickZoom={false}
            // Trick to make the map take up the rest of the screen height minus navbar
            className="w-full min-h-[calc(100dvh-72px)] bg-red-600"
        >
            <MyComponent />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';
import { FeatureCollection } from 'geojson';

import 'leaflet/dist/leaflet.js';
import 'leaflet/dist/leaflet.css';

import MarkerIcon from './components/MarkerIcon';
import fixGeoJson from './utils/fixGeojson';

import data from '../static/data.json';
import dongsData from '../static/dongs.json';
import videos from '../static/videos.json';
import createDongCard from './components/DongCard';
import { Dong } from '../types/Dong';

const initialPosition = { lat: 37.5291838748897, lng: 126.9818390908695 } as LatLngLiteral;

const markers = data.features.map((feature) => {
    const { geometry, properties } = feature;

    const color = videos.find((video) => video.id === properties.video)?.color;

    return (
        <Marker
            position={[geometry.coordinates[1], geometry.coordinates[0]]}
            key={properties.name}
            icon={MarkerIcon(color)}
        >
            <Popup>
                {properties.name}
            </Popup>
        </Marker>
    );
});

// @ts-expect-error
const dongs = fixGeoJson(dongsData as FeatureCollection<Dong['geometry'], Dong['properties']>).features
    .map((feature) => {
        const { properties, geometry } = feature;

        const video = videos.find((v) => v.geojson.includes(Number.parseInt(properties?.EMD_CD, 10)));
        const color = video?.color ?? 'gray';

        const dongCard = createDongCard(feature, video);

        return (
            <Polygon
                // @ts-expect-error
                positions={geometry.coordinates}
                key={properties?.EMD_CD ?? 'no name'}
                pathOptions={{ color }}
            >
                <Popup>
                    {dongCard}
                </Popup>
            </Polygon>
        );
    });


export default function App() {
    return (
        <>
            <h1>Welcome to my Dong Map</h1>
            <p>A unofficial map of all the places visited in the Welcome to my dong series</p>

            <MapContainer
                center={initialPosition}
                zoom={11}
                id={'map'}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {markers}

                {dongs}
            </MapContainer>
        </>
    );
}

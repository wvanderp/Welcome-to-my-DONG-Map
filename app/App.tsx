import React from 'react';
import { MapContainer, TileLayer, Popup, Polygon, ZoomControl } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';

import 'leaflet/dist/leaflet.js';
import 'leaflet/dist/leaflet.css';

import { GeoJSON } from 'geojson';
import fixGeoJson from './utils/fixGeojson';

import dataImport from '../static/data.json';
import dongsImport from '../static/dongs.json';
import videos from '../static/videos.json';
import { DongFile, DongProperties } from '../types/Dong';
import DongCard from './components/DongCard';
import { MarkerFile } from '../types/Marker';
import geometryMaker from './utils/geometryMaker';

const data = dataImport as MarkerFile;
const dongsData = dongsImport as DongFile
const initialPosition = { lat: 37.5291838748897, lng: 126.9818390908695 } as LatLngLiteral;

const markers = data.features.map((element) => geometryMaker(element));

const dongs = fixGeoJson<GeoJSON.Polygon, DongProperties>(dongsData).features
    .map((dong) => {
        const { geometry, properties } = dong;

        const video = videos.find((v) => v.geojson.includes(Number.parseInt(properties?.EMD_CD, 10)));
        const color = video?.color ?? 'gray';

        return (
            <Polygon
                // @ts-expect-error
                positions={geometry.coordinates}
                key={properties?.EMD_CD ?? 'no name'}
                pathOptions={{ color }}
            >
                <Popup>
                    <DongCard video={video} dong={properties} />
                </Popup>
            </Polygon>
        );
    });

export default function App() {
    return (
        <div className="con">
            <header>
                <h1>Welcome to my Dong Map</h1>
                <p>An unofficial map of all the places visited in the <a href="https://www.youtube.com/playlist?list=PLLUVyN0NcUJ_puQu9td7xQWzYRk_pyKIV">Welcome to my dong series</a></p>
            </header>
            <MapContainer
                center={initialPosition}
                zoom={11}
                id={'map'}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <ZoomControl position="bottomright" />
                {dongs}

                {markers}

            </MapContainer>
        </div>
    );
}

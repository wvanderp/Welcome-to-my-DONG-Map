import React from 'react';
import { Marker, Polygon, Polyline, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { GeoJSON } from 'geojson';
import MarkerIcon from '../components/MarkerIcon';
import MarkerCard from '../components/MarkerCard';
import { MarkerProperties } from '../../types/Marker';
import videos from '../../static/videos.json';

/**
 * this function takes in a geojson object and returns a react-leaflet component
 * the types are point, polyline, and polygon
 *
 */
export default function geometryMaker(
    geojson: GeoJSON.Feature<GeoJSON.Point | GeoJSON.LineString, MarkerProperties>
): React.ReactElement {
    const color = videos.find((video) => video.id === geojson.properties.video)?.color;

    switch (geojson.geometry.type) {
        case 'Point': {
            return (
                <Marker
                    position={[geojson.geometry.coordinates[1], geojson.geometry.coordinates[0]]}
                    key={geojson.properties.name}
                    icon={MarkerIcon(color)}
                >
                    <Popup>
                        <MarkerCard marker={geojson} />
                    </Popup>
                </Marker>
            );
        }
        case 'LineString': {
            const points = geojson.geometry.coordinates.map((point) => [point[1], point[0]] as LatLngExpression);

            // if the first and last points are the same, then it is a polygon and not a polyline
            if (
                JSON.stringify(geojson.geometry.coordinates[0]) === JSON.stringify(geojson.geometry.coordinates.at(-1))
            ) {
                return (
                    <Polygon
                        positions={points}
                        key={geojson.properties.name}
                        pathOptions={{
                            color,
                            fill: true,
                            fillOpacity: 0.5
                        }}
                    >
                        <Popup>
                            <MarkerCard marker={geojson} />
                        </Popup>
                    </Polygon>
                );
            }
            return (
                <Polyline
                    positions={points}
                    key={geojson.properties.name}
                    pathOptions={{
                        color,
                        weight: 10
                    }}
                >
                    <Popup>
                        <MarkerCard marker={geojson} />
                    </Popup>
                </Polyline>
            );
        }
        default: {
            throw new Error('invalid geojson type');
        }
    }
}

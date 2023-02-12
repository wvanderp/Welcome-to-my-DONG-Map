/* eslint-disable unicorn/no-array-for-each */
import { FeatureCollection } from 'geojson';

// fix geojson by switching lat and lng
export default function fixGeoJson(geojson: FeatureCollection): FeatureCollection {
    geojson.features.forEach((feature) => {
        if (feature.geometry.type === 'Polygon') {
            feature.geometry.coordinates.forEach((polygon) => {
                polygon.forEach((point) => {
                    point.reverse();
                });
            });
        }
        if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates.forEach((multiPolygon) => {
                multiPolygon.forEach((polygon) => {
                    polygon.forEach((point) => {
                        point.reverse();
                    });
                });
            });
        }
        if (feature.geometry.type === 'Point') {
            feature.geometry.coordinates.reverse();
        }
    });
    return geojson;
}

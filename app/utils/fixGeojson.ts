/* eslint-disable unicorn/no-array-for-each */
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

/**
 * reverses the coordinates of a GeoJSON FeatureCollection object
 *
 * @param {FeatureCollection} geojson a GeoJSON FeatureCollection object
 * @returns {FeatureCollection} the same GeoJSON FeatureCollection object, but with the coordinates of each feature reversed
 */
export default function fixGeoJson<G extends Geometry = Geometry, P = GeoJsonProperties>(
    geojson: FeatureCollection<G, P>
): FeatureCollection<G, P> {
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

import { GeoJSON } from 'geojson';

export type MarkerFile = GeoJSON.FeatureCollection<GeoJSON.Point | GeoJSON.LineString, MarkerProperties>;

export interface MarkerProperties {

        video: string; // video id of the video which this marker is associated with
        image: string; // screenshot of the video at the time of the marker

        name: string; // name of the marker
        name_korean?: string; // name of the marker in Korean
        official_name?: string; // official name of the marker (used to mark the location if I used a joke name)
        official_name_korean?: string; // official name of the marker in Korean

        google? : string; // google maps link
        naver? : string; // naver maps link
        kakao? : string; // kakao maps link
        wikipedia? : string; // wikipedia link
}

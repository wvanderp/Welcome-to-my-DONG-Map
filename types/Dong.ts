import { GeoJSON } from 'geojson';

export type DongFile = GeoJSON.FeatureCollection<GeoJSON.Polygon, DongProperties>;

export interface DongProperties {

        'EMD_CD': string;
        'EMD_KOR_NM': string;
        'EMD_ENG_NM': string;
        'ESRI_PK': number;
        'SHAPE_AREA': number;
        'SHAPE_LEN': number;

}

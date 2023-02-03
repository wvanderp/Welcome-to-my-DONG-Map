export interface DongFile {
    type: 'FeatureCollection';
    features: Dong[];
}

export interface Dong {
    'type': 'Feature',
    'geometry': {
        'type': 'Polygon',
        'coordinates': [number, number][][] | [number, number][]
    },
    'properties': {
        'EMD_CD': string;
        'EMD_KOR_NM': string;
        'EMD_ENG_NM': string;
        'ESRI_PK': number;
        'SHAPE_AREA': number;
        'SHAPE_LEN': number;
    }
}

export interface MarkerFile {
    type: 'FeatureCollection';
    features: Marker[];
}

export interface Marker {
    'type': 'Feature';
    'geometry': {
        'type': 'Point';
        'coordinates': [number, number]
    };
    'properties': {
        'video': string;
        'name': string;
        'google'? : string;
        image: string;
        'name_korean'?: string;
    }
}

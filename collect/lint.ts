/* eslint-disable no-console */

import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';

import videos from '../static/videos.json';
import {MarkerFile} from '../types/Marker';

const ajv = new Ajv();
const dongRegex = '^[A-Z][a-z]+-dong$';

// use ajv to validate the schema

const videoSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'array',
    items: {
        type: 'object',
        properties: {
            title: {
                type: 'string'
            },
            thumbnail: {
                type: 'string'
            },
            url: {
                type: 'string',
                pattern: '^https:\\/\\/www.youtube.com\\/watch\\?v=[\\w-]+$'
            },
            id: {
                type: 'string'
            },
            location: {
                type: 'string',
                pattern: dongRegex
            },
            geojson: {
                type: 'array',
                items: {
                    type: 'number'
                },
                minItems: 1
            },
            color: {
                type: 'string',
                pattern: '^#[\\dA-Fa-f]{6}$'
            },
            quote: {
                type: 'string'
            },
            imageAlbum: {
                type: 'string'
            }
        },
        required: ['title', 'thumbnail', 'url', 'id', 'location', 'geojson', 'color', 'quote'],
        additionalProperties: false
    }
};

const validateVideo = ajv.compile(videoSchema);

console.log('Linting videos.json...');
const isVideosValid = validateVideo(videos);
if (!isVideosValid) console.log(validateVideo.errors);

// sort the markers first by video and then by name

const markerPath = path.join(__dirname, '../static/data.json');
const markers = JSON.parse(fs.readFileSync(markerPath, 'utf8')) as MarkerFile;

markers.features.sort((a, b) => {
    const aTxt = `${a.properties.video}-${a.properties.name}`;
    const bTxt = `${b.properties.video}-${b.properties.name}`;
    return aTxt.localeCompare(bTxt);
});

fs.writeFileSync(markerPath, JSON.stringify(markers, null, 2));

// lint markers

const markerSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: {
        type: {
            type: 'string',
            enum: ['FeatureCollection']
        },
        generator: {
            type: 'string',
            enum: ['JOSM']
        },
        features: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        enum: ['Feature']
                    },
                    properties: {
                        type: 'object',
                        properties: {
                            image: {
                                type: 'string'
                            },
                            google: {
                                type: 'string'
                            },
                            name: {
                                type: 'string'
                            },
                            video: {
                                type: 'string',
                                pattern: '^[\\w-]+$'
                            }
                        },
                        required: ['image', 'google', 'name', 'video'],
                        additionalProperties: true
                    },
                    geometry: {
                        type: 'object',
                        properties: {
                            type: {
                                type: 'string',
                                enum: ['Point']
                            },
                            coordinates: {
                                type: 'array',
                                items: {
                                    type: 'number'
                                },
                                minItems: 2,
                                maxItems: 2
                            }
                        },
                        required: ['type', 'coordinates'],
                        additionalProperties: false
                    }
                },
                required: ['type', 'properties', 'geometry'],
                additionalProperties: false
            }
        }
    },
    required: ['type', 'features'],
    additionalProperties: false
};

const validateMarkers = ajv.compile(markerSchema);

console.log('Linting markers.json...');
const isMarkersValid = validateMarkers(markers);
if (!isMarkersValid) console.log(validateMarkers.errors);

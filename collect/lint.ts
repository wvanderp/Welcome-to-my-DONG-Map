/* eslint-disable no-console */

import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';

import {MarkerFile} from '../types/Marker';
import Video from '../types/Video';

function sortKeys<P extends object>(object: P): P {
    // @ts-expect-error
    const sortedObject: P = {};
    for (const key of Object.keys(object).sort()) {
    // @ts-expect-error
        sortedObject[key] = object[key];
    }
    return sortedObject;
}

const ajv = new Ajv();
const dongRegex = '^[A-Z][a-z]+(?:(?:-dong)|(?:-ro))$';

// ----------------------------------------------------------------------------------------------
// videos

const videoPath = path.join(__dirname, '../static/videos.json');
let videos = JSON.parse(fs.readFileSync(videoPath, 'utf8')) as Video[];

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
                type: 'string',
                minLength: 1
            },
            imageAlbum: {
                type: 'string'
            },
            colorNote: {
                type: 'string'
            },
            quoteNote: {
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

// check for duplicate video ids

const videoIds = new Set<string>();
const duplicateVideoIds = new Set<string>();

for (const video of videos) {
    if (videoIds.has(video.id)) duplicateVideoIds.add(video.id);
    else videoIds.add(video.id);
}

if (duplicateVideoIds.size > 0) {
    console.log('Duplicate video ids found:');
    console.log(duplicateVideoIds);
}

// notify of color and quote notes

const colorNoteVideos = videos.filter((video) => video.colorNote);

if (colorNoteVideos.length > 0) {
    console.log('Color notes found:');
    console.log(colorNoteVideos.map((video) => video.id));
}

// sort the keys of the object
videos = videos.map((video) => sortKeys(video));

// write the videos back to the file
fs.writeFileSync(videoPath, JSON.stringify(videos, null, 2));

// ----------------------------------------------------------------------------------------------
// sort the markers first by video and then by name

const markerPath = path.join(__dirname, '../static/data.json');
const markers = JSON.parse(fs.readFileSync(markerPath, 'utf8')) as MarkerFile;

markers.features.sort((a, b) => {
    const aTxt = `${a.properties.video}-${a.properties.name}`;
    const bTxt = `${b.properties.video}-${b.properties.name}`;
    return aTxt.localeCompare(bTxt);
});

// sort the keys of the object

markers.features = markers.features.map((feature) => ({
    type: feature.type,
    properties: sortKeys(feature.properties),
    geometry: feature.geometry
}));

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
                                type: 'string',
                                pattern: '^[A-Z].+$'
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
                        title: 'Geometry',
                        type: 'object',
                        properties: {
                            type: {
                                type: 'string',
                                enum: ['Point', 'LineString']
                            }
                        }
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

// find videos without markers

const videoIdsWithMarkers = new Set(markers.features.map((feature) => feature.properties.video));
const videoIdsWithoutMarkers = videos.filter((video) => !videoIdsWithMarkers.has(video.id)).map((video) => video.id);

if (videoIdsWithoutMarkers.length > 0) {
    console.log('Videos without markers:');
    console.log(videoIdsWithoutMarkers);

    // select a random video without markers and tell me to add a marker for it
    const randomVideo = videoIdsWithoutMarkers[Math.floor(Math.random() * videoIdsWithoutMarkers.length)];
    console.log(`Please add a marker for "${videos.find((video) => video.id === randomVideo)!.title}"`);
}

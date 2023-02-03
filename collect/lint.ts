/* eslint-disable no-console */
import videos from '../static/videos.json';

const dongRegex = /^[A-Z][a-z]+-dong$/g;

for (const video of videos) {
    // check if the location is XXX-dong
    if (!video.location) {
        console.error(`${video.id} (${video.location}): location is not set`);
    }

    if (video.location && !dongRegex.test(video.location)) {
        console.error(`${video.id} (${video.location}): ${video.location} is not in the right format`);
    }

    if (!video.geojson || video.geojson.length === 0) {
        console.error(`${video.id} (${video.location}) is missing a geojsonID`);
    }

    if (!video.color) {
        console.log(`${video.id} (${video.location}) is missing a color`);
    }

    // color should start with a #
    if (!video.color.startsWith('#')) {
        console.error(`${video.id} (${video.location}): color should start with a #`);
    }

    // it should have a thumbnail
    if (!video.thumbnail) {
        console.log(`${video.id} (${video.location}) is missing a thumbnail`);
    }

    // all videos have a quote about the dong
    if (!video.quote) {
        console.log(`${video.id} (${video.location}) is missing the quote`);
    }
}

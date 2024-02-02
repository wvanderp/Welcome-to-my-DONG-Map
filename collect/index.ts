/* eslint-disable no-console */
import youtubedl from 'youtube-dl-exec';
import fs from 'fs';
import path from 'path';
import { Entry, Playlist } from '../types/Playlist';

const playlistUrl = 'https://www.youtube.com/playlist?list=PLLUVyN0NcUJ_puQu9td7xQWzYRk_pyKIV';
const ignoredVideos = new Set([
    'a3A2YOlfVos', // intro video
    'tOWWbkwJF_A', // patron video
    'ScIt8RNRdjE' // cow brain video
]);

(async () => {
    console.log('Collecting videos...');
    const playlist = await youtubedl(playlistUrl, {
        dumpSingleJson: true,
        noWarnings: true,
        callHome: false,
        noCheckCertificates: true
    }) as unknown as Playlist;

    if (!playlist || !playlist.entries) {
        console.log('No videos found in the playlist!');
        return;
    }

    const videoFilePath = path.join(__dirname, '../static/videos.json');
    const videoFile = JSON.parse(fs.readFileSync(videoFilePath).toString());

    const videos = playlist.entries
        // filter out all null values
        .filter((video): video is Entry => video !== null)
        // map the videos to the format we want
        .map((video) => ({
            title: video.title,
            thumbnail: video.thumbnail,
            url: video.webpage_url,
            id: video.id,
            location: video.tags.find((tag: string) => tag.toLowerCase().endsWith('dong') && !tag.toLowerCase().startsWith('welcome')) ?? '',
            geojson: [] as number[],
            color: '',
            quote: ''
        }))
        // filter out all videos that are not directly related to a dong
        .filter((video) => !ignoredVideos.has(video.id))
        // filter out all videos that are already in the file
        // @ts-expect-error
        .filter((video) => !videoFile.some((v) => v.id === video.id))

    console.log(videos);

    videoFile.push(...videos);

    fs.writeFileSync(videoFilePath, JSON.stringify(videoFile, null, 4));
})();

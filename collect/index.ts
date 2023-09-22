/* eslint-disable no-console */
import youtubedl from 'youtube-dl-exec';
import fs from 'fs';
import path from 'path';

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
    });

    // @ts-expect-error - playlist.entries is not defined in the type definition because it's wrong
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const videos = playlist.entries.map((video: any) => ({
        title: video.title,
        thumbnail: video.thumbnail,
        url: video.webpage_url,
        id: video.id,
        location: video.tags.find((tag: string) => tag.toLowerCase().endsWith('dong') && !tag.toLowerCase().startsWith('welcome')) ?? '',
        geojson: [],
        color: '',
        quote: ''
    })) as {
        title: string,
        thumbnail: string,
        url: string,
        id: string,
        location: string,
        geojson: number[],
        color: string,
        quote: string
    }[];

    const videoFilePath = path.join(__dirname, '../static/videos.json');
    const videoFile = JSON.parse(fs.readFileSync(videoFilePath).toString());

    for (const video of videos) {
        // @ts-expect-error
        if (videoFile.some((v) => v.id === video.id)) {
            continue;
        }

        // skip the videos that are not directly related to a dong
        if (ignoredVideos.has(video.id)) {
            continue;
        }

        videoFile.push(video);
    }

    fs.writeFileSync(videoFilePath, JSON.stringify(videoFile, null, 4));
})();

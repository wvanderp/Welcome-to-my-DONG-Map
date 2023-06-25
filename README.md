# Welcome-to-my-DONG-Map

A map of all the places visited in [Welcome to my DONG](https://www.youtube.com/playlist?list=PLLUVyN0NcUJ_puQu9td7xQWzYRk_pyKIV)

live version available at <https://wvanderp.github.io/Welcome-to-my-DONG-Map/>

## How To Update

1. Run `npm run collect` to update the `videos.json` file
1. fill out the missing fields in `videos.json`

## How To Add A New DONG

1. download the videos from YouTube with `yt-dlp.exe https://www.youtube.com/playlist?list=PLLUVyN0NcUJ_puQu9td7xQWzYRk_pyKIV`
1. go through the video and find the locations. add them to `data.json`.
    1. add both a google maps link and a naver maps link
    1. take a screenshot of the location
1. when all the locations are found, upload the screenshots to imgur.
1. add the imgur links to `data.json`
1. add the imgur album link to `video.json`
1. run `npm run lintData` to check if everything is correct
1. commit the changes

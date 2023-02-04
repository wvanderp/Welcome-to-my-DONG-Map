import React from 'react';
import { Dong } from '../../types/Dong';
import Video from '../../types/Video';

export default function createDongCard(dong: Dong, video: Video | undefined) {
    const videoPart = video && (
        <>
            <h4>{video.quote}</h4>
            {/* thumbnail of the video */}
            <a href={video.url} target="_blank" rel="noreferrer">
                <img src={video.thumbnail} alt={video.title} />
            </a>
            {/* title of the video */}
            <a href={video.url} target="_blank" rel="noreferrer">

                <h3>{video.title}</h3>
            </a>

            {/* description of the dong */}

        </>
    );

    return (
        <div className="Card">
            {/* name of the dong */}
            <h2>{dong.properties.EMD_ENG_NM}</h2>

            {videoPart}
        </div>
    );
}

import React from 'react';
import { DongProperties } from '../../types/Dong';
import Video from '../../types/Video';

export default function DongCard(props: {
    dong: DongProperties,
    video: Video | undefined
}) {
    const videoPart = props.video && (
        <>
            <h4>{props.video.quote}</h4>
            {/* thumbnail of the props.video */}
            <a href={props.video.url} target="_blank" rel="noreferrer">
                <img src={props.video.thumbnail} alt={props.video.title} />
            </a>

            {/* title of the props.video */}
            <a href={props.video.url} target="_blank" rel="noreferrer">

                <h3>{props.video.title}</h3>
            </a>

            {/* description of the dong */}

        </>
    );

    return (
        <div className="Card">
            {/* name of the dong */}
            <h2>{props.dong.EMD_ENG_NM}</h2>

            {videoPart}
        </div>
    );
}

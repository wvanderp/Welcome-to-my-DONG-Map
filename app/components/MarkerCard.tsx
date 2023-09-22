import React from 'react';
import {MarkerFile} from '../../types/Marker';

// @ts-expect-error y u not know about svg
import googleMapsIcon from '../../static/Google_Maps_icon.svg';
// @ts-expect-error y u not know about png
import naverMapsIcon from '../../static/naver.png';
// @ts-expect-error y u not know about png
import kakaoMapsIcon from '../../static/kakao.png';
// @ts-expect-error y u not know about svg
import wikipediaIcon from '../../static/Wikipedia.svg';

type providers = 'google' | 'naver' | 'kakao' | 'Wikipedia';
const iconLinks: Record<providers, string> = {
    google: googleMapsIcon,
    naver: naverMapsIcon,
    kakao: kakaoMapsIcon,
    Wikipedia: wikipediaIcon
};

function Icon(props: {
    iconType: providers;
    link: string | undefined;
}) {
    if (!props.link) return null;

    return (
        <a href={props.link} target="_blank" rel="noreferrer" className="googleLink">
            <img src={iconLinks[props.iconType]} alt={props.iconType} />
        </a>
    );
}

export default function MarkerCard(props: {
    marker: MarkerFile['features'][0]
}) {
    const names = [
        props.marker.properties.name_korean,
        props.marker.properties.official_name,
        props.marker.properties.official_name_korean
    ].filter((name) => name !== undefined);

    return (
        <div className="Card">
            <h2>{props.marker.properties.name}</h2>
            {names.length > 0 && (<h3>{names.join(' | ')}</h3>)}
            <img src={props.marker.properties.image} alt={props.marker.properties.name} />

            <Icon iconType="google" link={props.marker.properties.google} />
            <Icon iconType="naver" link={props.marker.properties.naver} />
            <Icon iconType="kakao" link={props.marker.properties.kakao} />
            <Icon iconType="Wikipedia" link={props.marker.properties.wikipedia} />
        </div>
    );
}

import React from 'react';
import { Marker } from '../../types/Marker';

// @ts-expect-error y u not know about svg
import googleMapsIcon from '../../static/Google_Maps_icon.svg';

export default function createMarkerCard(marker: Marker) {
    return (
        <div className="Card">
            <h2>{marker.properties.name}</h2>
            <img src={marker.properties.image} alt={marker.properties.name} />

            {marker.properties.google && (
                <a href={marker.properties.google} target="_blank" rel="noreferrer" className="googleLink">
                    <img src={googleMapsIcon} alt="google" />
                </a>
            )}
        </div>
    );
}

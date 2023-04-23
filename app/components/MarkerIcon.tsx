import { divIcon } from 'leaflet';

// icon from https://commons.wikimedia.org/wiki/File:Eo_circle_amber_white_circle.svg
// @ts-expect-error svg files are not compatible with typescript
// eslint-disable-next-line import/no-unresolved
import icon from 'bundle-text:./icon.svg';

const iconHeight = 512 / 32;
const iconWidth = 512 / 32;

export default function MarkerIcon(color?: string) {
    const logo = document.createElement('div');
    logo.innerHTML = icon;

    if (logo.querySelector('svg path')) {
        // @ts-expect-error I already checked you just don't want to cooperate
        logo.querySelector('path').style.fill = color ?? 'black';
    }

    return divIcon({
        html: logo,
        iconSize: [iconWidth, iconHeight],
        iconAnchor: [iconWidth / 2, iconHeight / 2 + 5]
    });
}

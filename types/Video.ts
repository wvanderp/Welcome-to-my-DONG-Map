export default interface Video {
    'title': string;
    'thumbnail': string;
    'url': string;
    'id': string;
    'location': string;
    'geojson': number[]
    'color': string;
    'quote': string;

    // sometime its difficult to get the color from the video so we use the colorNote to tell our trubbels
    'colorNote'?: string;
    'quoteNote'?: string

    // Bart had a old map which he needed to redo and he used different colors for the new map.
    // so this variable was added to keep track of the old color and indicate if we have switched over to the new color.
    'oldColor'?: string | boolean;
}

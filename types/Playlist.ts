export interface Playlist {
    id: string;
    title: string;
    availability: string;
    channel_follower_count: null;
    description: string;
    tags: unknown[];
    thumbnails: Thumbnail[];
    modified_date: string;
    view_count: number;
    playlist_count: number;
    channel: string;
    channel_id: string;
    uploader_id: string;
    uploader: string;
    channel_url: string;
    uploader_url: string;
    _type: string;
    entries: Array<Entry | null>;
    extractor_key: string;
    extractor: string;
    webpage_url: string;
    original_url: string;
    webpage_url_basename: string;
    webpage_url_domain: string;
    release_year: null;
    epoch: number;
    __files_to_move: FilesToMove;
    _version: Version;
}

export interface FilesToMove {
}

export interface Version {
    version: string;
    current_git_head: null;
    release_git_head: string;
    repository: string;
}

export interface Entry {
    id: string;
    title: string;
    formats: Format[];
    thumbnails: Thumbnail[];
    thumbnail: string;
    description: string;
    channel_id: string;
    channel_url: string;
    duration: number;
    view_count: number;
    average_rating: null;
    age_limit: number;
    webpage_url: string;
    categories: string[];
    tags: string[];
    playable_in_embed: boolean;
    live_status: string;
    release_timestamp: null;
    _format_sort_fields: string[];
    automatic_captions: { [key: string]: AutomaticCaption[] };
    subtitles: Subtitles;
    comment_count: number;
    chapters: Chapter[] | null;
    heatmap: Heatmap[] | null;
    location: string;
    like_count: number;
    channel: string;
    channel_follower_count: number;
    channel_is_verified: boolean;
    uploader: string;
    uploader_id: string;
    uploader_url: string;
    upload_date: string;
    availability: string;
    original_url: string;
    webpage_url_basename: string;
    webpage_url_domain: string;
    extractor: string;
    extractor_key: string;
    playlist_count: number;
    playlist: string;
    playlist_id: string;
    playlist_title: string;
    playlist_uploader: string;
    playlist_uploader_id: string;
    n_entries: number;
    playlist_index: number;
    __last_playlist_index: number;
    playlist_autonumber: number;
    display_id: string;
    fulltitle: string;
    duration_string: string;
    release_year: null;
    is_live: boolean;
    was_live: boolean;
    requested_subtitles: null;
    _has_drm: null;
    epoch: number;
    requested_downloads: RequestedDownload[];
    requested_formats: Format[];
    format: string;
    format_id: string;
    ext: string;
    protocol: string;
    language: string;
    format_note: string;
    filesize_approx: number;
    tbr: number;
    width: number;
    height: number;
    resolution: string;
    fps: number;
    dynamic_range: string;
    vcodec: string;
    vbr: number;
    stretched_ratio: null;
    aspect_ratio: number;
    acodec: string;
    abr: number;
    asr: number;
    audio_channels: number;
}

export interface AutomaticCaption {
    ext: string;
    url: string;
    name?: string;
    protocol?: string;
}

export interface Chapter {
    start_time: number;
    title: string;
    end_time: number;
}

export interface Format {
    format_id: string;
    format_note?: string;
    ext: string;
    protocol: string;
    acodec?: string;
    vcodec: string;
    url: string;
    width?: number | null;
    height?: number | null;
    fps?: number | null;
    rows?: number;
    columns?: number;
    fragments?: Fragment[];
    resolution: string;
    aspect_ratio: number | null;
    http_headers: HttpHeaders;
    audio_ext: string;
    video_ext: string;
    vbr: number | null;
    abr: number | null;
    tbr: number | null;
    format: string;
    format_index?: null;
    manifest_url?: string;
    language?: null | string;
    preference?: null;
    quality?: number;
    has_drm?: boolean;
    source_preference?: number;
    asr?: number | null;
    filesize?: number | null;
    audio_channels?: number | null;
    language_preference?: number;
    dynamic_range?: null | string;
    container?: string;
    downloader_options?: DownloaderOptions;
    filesize_approx?: number;
}

export interface DownloaderOptions {
    http_chunk_size: number;
}

export interface Fragment {
    url: string;
    duration: number;
}

export interface HttpHeaders {
    'User-Agent': string;
    Accept: string;
    'Accept-Language': string;
    'Sec-Fetch-Mode': string;
}

export interface Heatmap {
    start_time: number;
    end_time: number;
    value: number;
}

export interface RequestedDownload {
    requested_formats: Format[];
    format: string;
    format_id: string;
    ext: string;
    protocol: string;
    language: string;
    format_note: string;
    filesize_approx: number;
    tbr: number;
    width: number;
    height: number;
    resolution: string;
    fps: number;
    dynamic_range: string;
    vcodec: string;
    vbr: number;
    aspect_ratio: number;
    acodec: string;
    abr: number;
    asr: number;
    audio_channels: number;
    _filename: string;
    filename: string;
    __write_download_archive: boolean;
}

export interface Subtitles {
    en?: AutomaticCaption[];
    ko: AutomaticCaption[];
    nl?: AutomaticCaption[];
    'en-US'?: AutomaticCaption[];
    'en-AU'?: AutomaticCaption[];
    'en-CA'?: AutomaticCaption[];
    'en-IN'?: AutomaticCaption[];
    'en-IE'?: AutomaticCaption[];
    'en-GB'?: AutomaticCaption[];
}

export interface Thumbnail {
    url: string;
    preference?: number;
    id: string;
    height?: number;
    width?: number;
    resolution?: string;
}

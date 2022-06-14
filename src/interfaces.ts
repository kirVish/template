interface IArtist {
    id: string;
    name: string;
}

interface IImage {
    url: string;
    height: number;
    width: number;
}

export interface ITrack {
    id: string;
    name?: string;
    href?: string;
    preview_url?: string;
    album?: {
        images?: IImage[];
        artists?: IArtist[];
    },
    isPlaying?: boolean;
}
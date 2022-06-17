interface IArtist {
    id: string;
    name: string;
}

interface IImage {
    url: string;
    height: number;
    width: number;
}

/**
 * Формат данных при запросе треков из чарта
 */
export interface ITopTrack {
    preview_url?: string;
    name?: string;
    href?: string;
    isPlaying?: boolean;
    track: ITrack;
}

/**
 * Формат данных при запросе треков поиском
 */
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

export enum CUR_TAB {
    MAIN,
    SEARCH
}
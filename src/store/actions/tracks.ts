import { getByCategories, getByPlaylist, getBySearch } from "../../api/spotifyApi";
import { TOP_LIST } from "../../consts";
import { ITopTrack, ITrack } from "../../interfaces";
import { Dispatch } from "redux";
import { TracksAction, TracksActionTypes } from "../../types/tracks";

const filterTopTracks = (tracks: ITopTrack[]): ITrack[] => tracks.map(item => {
    const track = item.track;
    return track;
}).filter(track => !!track.preview_url);

export const fetchTopTracks = () => {
    return async (dispatch: Dispatch<TracksAction>) => {
        try {
            dispatch({
                type: TracksActionTypes.FETCH_TRACKS
            });
            const topList = await getByCategories(TOP_LIST);
            const playlistId = topList[0].id;
            const topTracks: ITopTrack[] = await getByPlaylist(playlistId);
            const tracks = filterTopTracks(topTracks);
            dispatch({
                type: TracksActionTypes.FETCH_TRACKS_SUCCESS,
                payload: tracks
            })
        } catch (e) {
            dispatch({
                type: TracksActionTypes.FETCH_TRACKS_ERROR,
                payload: e as Error
            })
        }
    };
};

export const fetchSearchTracks = (trackName: string) => {
    return async (dispatch: Dispatch<TracksAction>) => {
        try {
            dispatch({
                type: TracksActionTypes.FETCH_TRACKS
            });
            let tracks: ITrack[] = await getBySearch(trackName, 'track');
            tracks = tracks.filter(track => !!track.preview_url);
            dispatch({
                type: TracksActionTypes.FETCH_TRACKS_SUCCESS,
                payload: tracks
            })
        } catch (e) {
            dispatch({
                type: TracksActionTypes.FETCH_TRACKS_ERROR,
                payload: e as Error
            })
        }
    };
};

export const resetTracks = () => ({
    type: TracksActionTypes.RESET_TRACKS
})
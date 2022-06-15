import { ITrack } from "../interfaces";

export interface TracksState {
    tracks: ITrack[],
    loading: boolean,
    error: null | Error
}
export enum TracksActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}
interface FetchTracksAction {
    type: TracksActionTypes.FETCH_TRACKS;
}
interface FetchTracksSuccessAction {
    type: TracksActionTypes.FETCH_TRACKS_SUCCESS;
    payload: ITrack[]
}
interface FetchTracksErrorAction {
    type: TracksActionTypes.FETCH_TRACKS_ERROR;
    payload: null | Error;
}
export type TracksAction = FetchTracksAction | FetchTracksErrorAction | FetchTracksSuccessAction;
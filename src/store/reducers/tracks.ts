import { TracksAction, TracksActionTypes, TracksState } from "../../types/tracks";

const initialState = {
    tracks: [],
    loading: false,
    error: null
}

export default function tracksReduser(state: TracksState = initialState, action: TracksAction): TracksState {
    switch (action.type) {

        case TracksActionTypes.FETCH_TRACKS:
            return { ...state, loading: true }

        case TracksActionTypes.FETCH_TRACKS_ERROR:
            return { ...state, error: action.payload }

        case TracksActionTypes.FETCH_TRACKS_SUCCESS:
            return { ...state, tracks: [...action.payload] }

        default:
            return state;
    }
}
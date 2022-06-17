import { PlayerAction, PlayerActionTypes, PlayerState } from "../../types/player";

const initialState = {
    track: {
        id: '0'
    },
    playing: false
}

export default function playerReduser(state: PlayerState = initialState, action: PlayerAction): PlayerState {
    switch (action.type) {

        case PlayerActionTypes.PLAY:
            return { ...state, playing: true }

        case PlayerActionTypes.PAUSE:
            return { ...state, playing: false }

        case PlayerActionTypes.CHANGE_TRACK:
            return { ...state, track: action.payload, playing: true }

        default:
            return state;
    }
}
import { ITrack } from '../../interfaces';
import { PlayerActionTypes } from '../../types/player';

export const play = () => ({
    type: PlayerActionTypes.PLAY
})

export const pause = () => ({
    type: PlayerActionTypes.PAUSE
})

export const changeTrack = (track: ITrack) => ({
    type: PlayerActionTypes.CHANGE_TRACK,
    payload: track
})
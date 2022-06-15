import { ITrack } from "../interfaces";

export interface PlayerState {
    track: ITrack,
    playing: boolean
}
export enum PlayerActionTypes {
    PLAY = 'PLAY',
    PAUSE = 'PAUSE',
    CHANGE_TRACK = 'CHANGE_TRACK',
}
interface PlayAction {
    type: PlayerActionTypes.PLAY;
}
interface PauseAction {
    type: PlayerActionTypes.PAUSE;
}
interface ChangeAction {
    type: PlayerActionTypes.CHANGE_TRACK;
    payload: ITrack;
}
export type PlayerAction = PlayAction | PauseAction | ChangeAction;
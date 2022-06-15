import * as TracksActionCreators from './tracks';
import * as PlayerActionCreators from './player';

const ActionCreators = {
    ...TracksActionCreators,
    ...PlayerActionCreators
}

export default ActionCreators;
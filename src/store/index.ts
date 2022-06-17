import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import playerReduser from './reducers/player';
import tracksReduser from './reducers/tracks';

const rootReducer = combineReducers({
    tracks: tracksReduser,
    player: playerReduser
})

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

export type RootState = ReturnType<typeof rootReducer>

export default store;
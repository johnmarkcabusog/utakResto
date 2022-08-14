import { combineReducers } from 'redux';
import { appReducer } from './AppReducer';

export const reducers = combineReducers({
    appState: appReducer
})

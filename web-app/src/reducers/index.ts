import currentUserRed from './currentUser_reducers';
import loginLogOutRed from './loginLogout_reducer';
import {combineReducers } from 'redux';

const rootReducer = combineReducers({
    currentUserRed,
    loginLogOutRed
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
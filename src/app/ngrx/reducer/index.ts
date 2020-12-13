import { ActionReducerMap, createSelector } from '@ngrx/store';
import { userReducerState } from './user-reducer';
import *as fromUser from './user-reducer';
export interface rootReducerState {
    users: userReducerState;
}

export const rootReducer: ActionReducerMap<rootReducerState> = {
    users:fromUser.userReducer
}

export const getUserState = (state: rootReducerState) => state.users;

export const getUserInfo = createSelector(getUserState, fromUser.getUserInfo);
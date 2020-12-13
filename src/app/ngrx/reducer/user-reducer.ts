import { user } from '../../model/user-model';
import { Action } from '../actions';
import { USER_INFO } from '../actions/user-action';

export interface userReducerState {
    user: user;
}
const initialState: userReducerState = {
    user: {
        email: '',
        isNewUser: false,
        creationTime: '',
        lastSignInTime:''

    }
}

export function userReducer(state = initialState, action: Action): userReducerState {
    switch (action.type) {
        case USER_INFO: {
            const currentUser = action.payload.data;
            return {
                ...state,
                user: currentUser
            };
        }
        default: {
            return { ...state };
        }
    }
}

export const getUserInfo = (state: userReducerState) => state.user;


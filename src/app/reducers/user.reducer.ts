import { Action } from '@ngrx/store'
import { User } from './../models/user.model'
import * as UserActions from './../actions/user.actions'

// Section 1
const initialState: User = {
    user: 0,
}

// Section 2
export function reducer(state: User = initialState, action: UserActions.Actions) {
    // Section 3
    switch(action.type) {
        case UserActions.UPDATE_USER:
            return {...state, user: action.payload.user};
        default:
            return state;
    }
}
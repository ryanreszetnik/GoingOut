
import {LOGGED_OUT, LOGGED_IN, INITIALIZING}  from '../Constants/authConstants'
import {SET_AUTH_STATUS, SET_AUTH_USER} from '../Actions/authActions'
import {UserSession} from '../Types/common.types'

const INITIAL_STATE = {user:null,authStatus:INITIALIZING};

export default function userSessionReducer(state=INITIAL_STATE, action):UserSession{
    switch(action.type){
        case SET_AUTH_STATUS:
            return {
                ...state,
                authStatus:action.payload
            }
        case SET_AUTH_USER:
            return {
                ...state,
                user:action.payload
            }
        default:
            return state;
    }
}
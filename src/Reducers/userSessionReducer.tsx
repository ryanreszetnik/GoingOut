
import {LOGGED_OUT, LOGGED_IN, INITIALIZING}  from '../Constants/authConstants'
import {SET_AUTH_STATUS, SET_AUTH_USER,SET_CURR_USER_DATA} from '../Actions/authActions'
import {UserSession} from '../Types/common.types'

const INITIAL_STATE = {user:null,authStatus:INITIALIZING,userData:null};

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
        case SET_CURR_USER_DATA:{
            return{
                ...state,
                userData:action.payload
            }
        }
        default:
            return state;
    }
}
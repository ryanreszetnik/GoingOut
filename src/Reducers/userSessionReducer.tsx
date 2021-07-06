
import {LOGGED_OUT, LOGGED_IN, INITIALIZING}  from '../Constants/authConstants'
import {SET_AUTH_STATUS, SET_AUTH_USER,SET_CURR_USER_DATA, SET_USER_GROUPS,SET_SOCKET} from '../Actions/authActions'
import {UserSession} from '../Types/common.types'

const INITIAL_STATE = {user:null,authStatus:INITIALIZING,userData:null, userGroups:[],socket:null};

export default function userSessionReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case SET_SOCKET:
            return{
                ...state,
                socket:action.payload
            }

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
        case SET_USER_GROUPS: 
            return {...state, userGroups:[action.payload]}
            
        default:
            return state;
    }
}
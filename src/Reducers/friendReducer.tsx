const INITIAL_STATE = {friends:[], curProfile:null};
import {ADD_FRIEND, REMOVE_FRIEND, SET_FRIENDS, SET_CUR_PROFILE} from "../Actions/friendActions"

export default function friendReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case SET_FRIENDS:
            return {...state, friends:action.payload}
        case ADD_FRIEND:
            return {...state, friends: [...state.friends, action.payload]}
        case REMOVE_FRIEND:
            return {...state, friends:state.friends.filter((friend)=>{friend !== action.payload})}
        case SET_CUR_PROFILE:
            return {...state, curProfile:{...action.payload}}
        default:
            return state;
    }
}
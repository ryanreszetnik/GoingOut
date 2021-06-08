const INITIAL_STATE = {friends:[], curProfile:null};
import {ADD_FRIEND, REMOVE_FRIEND, SET_FRIENDS, SET_CUR_PROFILE,ACCEPT_REQUEST} from "../Actions/friendActions"
import { CONFIRMED, REQUESTED } from "../Constants/friendConstants";

export default function friendReducer(state=INITIAL_STATE, action){
    
    switch(action.type){
        case SET_FRIENDS:
            return {...state, friends:action.payload}
        case ADD_FRIEND:
            return {...state,friends: [...state.friends, {...action.payload,status:REQUESTED}],
                curProfile:{...(state.curProfile.sub===action.payload.sub?{...action.payload,status:REQUESTED}:state.curProfile)}}
        case REMOVE_FRIEND:
            return {...state,
                friends:state.friends.filter((friend)=>friend.sub !== action.payload.sub),
                curProfile:{...(state.curProfile.sub===action.payload.sub?{...action.payload,status:""}:state.curProfile)}}
            
        case SET_CUR_PROFILE:
            return {...state, curProfile:{...action.payload}}
        case ACCEPT_REQUEST:
            return{...state, friends:state.friends.map(fr=>{
                if(fr.sub===action.payload.sub){
                    return {...action.payload,status:CONFIRMED}
                }
                return fr;
            }),curProfile:{...(state.curProfile.sub===action.payload.sub?{...action.payload,status:CONFIRMED}:state.curProfile)}}
        default:
            return state;
    }
}
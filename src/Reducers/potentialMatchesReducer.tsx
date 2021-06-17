import { SET_DATE, SET_FOUND_MATCHES, SET_USER_MATCHES} from "../Actions/groupActions";

const INITIAL_STATE = {foundMatches:[],date:"", userMatches:[]}
export default function potentialMatchesReducer(state=INITIAL_STATE, action){
    switch(action.type){
        
        case SET_DATE:
            return {...state, date:action.payload}
        case SET_FOUND_MATCHES:
            return {...state, foundMatches:action.payload}
        case SET_USER_MATCHES:
            return {...state, userMatches:action.payload}
        default:
            return state;
    }
    
}
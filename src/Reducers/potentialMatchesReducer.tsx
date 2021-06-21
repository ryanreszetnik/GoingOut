import { ADD_USER_MATCH, EDIT_USER_MATCH, REMOVE_USER_MATCH, SET_DATE, SET_FOUND_MATCHES, SET_USER_MATCHES} from "../Actions/groupActions";

const INITIAL_STATE = {foundMatches:[],date:"", userMatches:[],}
export default function potentialMatchesReducer(state=INITIAL_STATE, action){
    switch(action.type){
        
        case SET_DATE:
            return {...state, date:action.payload}
        case SET_FOUND_MATCHES:
            return {...state, foundMatches:action.payload}
        case SET_USER_MATCHES:
            return {...state, userMatches:action.payload}
        case ADD_USER_MATCH:
            return {...state, userMatches:[...state.userMatches, action.payload]}
        case REMOVE_USER_MATCH:
            return {...state, userMatches:state.userMatches.filter(match=>!(match.groupId === action.payload.groupId && match.date === action.payload.date))}
        case EDIT_USER_MATCH:
            return {...state, userMatches:state.userMatches.map((match) => !(match.groupId == action.payload.groupId  && match.date === action.payload.date)?{...match}:action.payload)}
        default:
            return state;
    }
    
}
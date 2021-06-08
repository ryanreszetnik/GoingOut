import { SET_CUR_GROUP, ADD_PERM_GROUP, REMOVE_PERM_GROUP, SET_PERM_GROUPS} from "../Actions/groupActions";

const INITIAL_STATE = {permGroups:[], tempGroups:[], curGroup:null}
export default function groupsReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case SET_CUR_GROUP:
            return {...state, curGroup:action.payload}    
        case ADD_PERM_GROUP:
            return {...state, permGroups:[...state.permGroups, action.payload]}
        case REMOVE_PERM_GROUP:
            return {...state, permGroups:[...state.permGroups.filter((group)=>group.groupId !== action.payload)]}
        case SET_PERM_GROUPS:
            return {permGroups:[action.payload]}
        default:
            return state;
    }
    
}
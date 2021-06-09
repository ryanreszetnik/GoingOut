import { SET_CUR_GROUP, ADD_PERM_GROUP, REMOVE_PERM_GROUP, SET_PERM_GROUPS, ADD_MEMBERS, EDIT_PERM_GROUP} from "../Actions/groupActions";
import PermGroups from "../Pages/PermGroups/PermGroups";

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
            return {...state, permGroups:[action.payload]}
        case ADD_MEMBERS:
            return {...state, permGroups:state.permGroups.map((group) => (group.groupId !== state.curGroup)?{...group}:{...group, members:action.payload})}
        case EDIT_PERM_GROUP:
            return {...state, permGroups:state.permGroups.map((group) => (group.groupId !== state.curGroup)?{...group}:action.payload)}
        default:
            return state;
    }
    
}
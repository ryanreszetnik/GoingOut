import { SET_CUR_GROUP, ADD_PERM_GROUP, REMOVE_PERM_GROUP, SET_PERM_GROUPS, ADD_MEMBERS, EDIT_PERM_GROUP, REMOVE_MEMBERS, ADD_MATCH, SET_MATCHES, SET_FOUND_MATCHES, SET_CUR_BASE_GROUP, SET_TEMP_GROUPS, ADD_TEMP_GROUP, REMOVE_TEMP_GROUP} from "../Actions/groupActions";

const INITIAL_STATE = {permGroups:[], tempGroups:[], matches:[], curGroup:null,curBaseGroup:null}
export default function groupsReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case SET_CUR_BASE_GROUP:
            return {...state,curBaseGroup:action.payload}
        case SET_CUR_GROUP:
            return {...state, curGroup:action.payload}    
        case ADD_PERM_GROUP:
            return {...state, permGroups:[...state.permGroups, action.payload]}
        case REMOVE_PERM_GROUP:
            return {...state, permGroups:[...state.permGroups.filter((group)=>group.groupId !== action.payload)]}
        case SET_PERM_GROUPS:
            return {...state, permGroups:action.payload}
        case ADD_MEMBERS:
            return {...state, permGroups:state.permGroups.map((group) => (group.groupId !== state.curGroup)?{...group}:{...group, members:action.payload})}
        case REMOVE_MEMBERS:
            return {...state, permGroups:state.permGroups.map((group) => (group.groupId !== state.curGroup)?{...group}:{...group, members:action.payload})}
        case EDIT_PERM_GROUP:
            return {...state, permGroups:state.permGroups.map((group) => (group.groupId !== state.curGroup)?{...group}:action.payload)}
        case SET_MATCHES:
            return {...state, matches:action.payload}
        case ADD_MATCH:
            return {...state, matches:[...state.matches, action.payload]}
        case SET_TEMP_GROUPS:
            return {...state, tempGroups:action.payload}
        case ADD_TEMP_GROUP:
            return {...state, tempGroups:[...state.tempGroups, action.payload]}
        case REMOVE_TEMP_GROUP:
            return {...state, tempGroups:[...state.tempGroups.filter((group)=>group.groupId !== action.payload)]}
        default:
            return state;
    }
    
}
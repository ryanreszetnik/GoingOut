import {
  SET_PERM_GROUPS,
  ADD_PERM_GROUP,
  REMOVE_PERM_GROUP,
  EDIT_PERM_GROUP,
  REMOVE_PERM_MEMBERS,
  ADD_PERM_MEMBERS
} from "../Actions/groupActions";

const INITIAL_STATE = [];
export default function permGroupsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PERM_GROUPS://[PermGroup]
        return action.payload;
    case ADD_PERM_GROUP://PermGroup
        return[...state,action.payload];
    case REMOVE_PERM_GROUP://groupId
        return state.filter(gr=>gr.groupId!==action.payload);
    case EDIT_PERM_GROUP://PermGroup
        return state.map(gr=>{
            if(gr.groupId===action.payload.groupId){
                return action.payload;
            }
            return gr;
        });
    case REMOVE_PERM_MEMBERS://[subs]
        return state.map(gr=>{
            if(gr.groupId===action.payload.groupId){
                return {
                    ...gr,
                    members:gr.members.filter(mem=>{
                        return !action.payload.find(mem.sub)
                    })
                }
            }
            return gr;
        });
    case ADD_PERM_MEMBERS://[Member]
        return state.map(gr=>{
            if(gr.groupId===action.payload.groupId){
                return {
                    ...gr,
                    members:[...gr.members,...action.payload]
                }
            }
            return gr;
        });
    default:
      return state;
  }
}

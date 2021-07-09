import {
  SET_CUR_PERM_GROUP,
  SET_CUR_TEMP_GROUP,
  SET_CUR_MATCH,
  SET_CUR_FOUND_MATCH
} from "../Actions/groupActions";
const INITIAL_STATE = {
    permGroup:null,
    tempGroup:null,
    match:null,
    foundMatch:null
};
export default function currentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CUR_PERM_GROUP://groupId
        return {...state,permGroup:action.payload}
    case SET_CUR_TEMP_GROUP://groupId
        return {...state,tempGroup:action.payload}
    case SET_CUR_MATCH://matchId
        return {...state,match:action.payload}
    case SET_CUR_FOUND_MATCH://groupId
        return {...state,foundMatch:action.payload}
    default:
      return state;
  }
}

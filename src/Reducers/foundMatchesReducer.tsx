import {
  SET_FOUND_MATCHES,
  ADD_FOUND_MATCH,
  REMOVE_FOUND_MATCH
} from "../Actions/groupActions";
const INITIAL_STATE = [];
export default function foundMatchesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FOUND_MATCHES://[Match]
        return action.payload;
    case ADD_FOUND_MATCH://Match
        return[...state,action.payload];
    case REMOVE_FOUND_MATCH://groupId
        return state.filter(gr=>gr.groupId!==action.payload);
    default:
      return state;
  }
}

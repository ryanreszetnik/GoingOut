import {
  SET_FOUND_MATCHES,
  ADD_FOUND_MATCH,
  REMOVE_FOUND_MATCH,
} from "../../Constants/reducerEvents"
const INITIAL_STATE = []
export default function foundMatchesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FOUND_MATCHES: //[Match]
      return action.payload
    case ADD_FOUND_MATCH: //Match
      return [...state, action.payload]
    case REMOVE_FOUND_MATCH: //eventId
      return state.filter((gr) => gr.eventId !== action.payload)
    default:
      return state
  }
}

const INITIAL_STATE = []
import {
  ADD_FRIEND,
  REMOVE_FRIEND,
  SET_FRIENDS,
} from "../Actions/friendActions"
import { CONFIRMED, REQUESTED } from "../Constants/friendConstants"

export default function friendReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FRIENDS:
      return [...action.payload]
    case ADD_FRIEND:
      return [...state, action.payload]
    case REMOVE_FRIEND:
      return state.filter((f) => f.sub !== action.payload.sub)
    default:
      return state
  }
}

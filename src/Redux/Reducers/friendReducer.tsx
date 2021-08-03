const INITIAL_STATE = []
import {
  ADD_FRIEND,
  REMOVE_FRIEND,
  SET_FRIENDS,
  UPDATE_FRIEND,
} from "../../Constants/reducerEvents"

export default function friendReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FRIENDS:
      return [...action.payload]
    case ADD_FRIEND:
      return [...state, action.payload]
    case UPDATE_FRIEND:
      return state.map((f) => {
        if (f.sub === action.payload.sub) {
          return action.payload
        }
        return f
      })
    case REMOVE_FRIEND:
      return state.filter((f) => f.sub !== action.payload.sub)
    default:
      return state
  }
}

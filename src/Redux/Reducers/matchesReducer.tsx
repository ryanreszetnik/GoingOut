import {
  SET_MATCHES,
  ADD_MATCH,
  REMOVE_MATCH,
  EDIT_MATCH,
} from "../../Constants/reducerEvents"
const INITIAL_STATE = []
export default function matchesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_MATCHES: //[Match]
      return action.payload
    case ADD_MATCH: //Match
      return [...state, action.payload]
    case REMOVE_MATCH: //matchId
      return state.filter((ma) => ma.matchId !== action.payload)
    case EDIT_MATCH: //Match
      return state.map((ma) => {
        if (ma.matchId === action.payload.matchId) {
          return action.payload
        }
        return ma
      })
    default:
      return state
  }
}

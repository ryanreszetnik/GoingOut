const INITIAL_STATE = []
import {
  SET_NOTIFICATIONS,
  ADD_NOTIFICATION,
} from "../Actions/notifcationActions"

export default function notificationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return action.payload
    case ADD_NOTIFICATION:
      return [action.payload, ...state]
    default:
      return state
  }
}

import { SET_CUR_PROFILE } from "../Actions/friendActions"
import {
  SET_CUR_PERM_GROUP,
  SET_CUR_TEMP_GROUP,
  SET_CUR_MATCH,
  SET_CUR_FOUND_MATCH,
} from "../Actions/groupActions"
import {
  NOTIFICATIONS_PAGE,
  PERM_GROUPS_PAGE,
  PROFILE_PAGE,
  TEMP_GROUPS_PAGE,
} from "../Constants/pageConstants"
const INITIAL_STATE = {
  permGroup: null,
  tempGroup: null,
  match: null,
  foundMatch: null,
  profile_profile: null,
  perm_groups_profile: null,
  temp_groups_profile: null,
  notifications_profile: null,
}
export default function currentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CUR_PERM_GROUP: //groupId
      return { ...state, permGroup: action.payload }
    case SET_CUR_TEMP_GROUP: //groupId
      return { ...state, tempGroup: action.payload }
    case SET_CUR_MATCH: //matchId
      return { ...state, match: action.payload }
    case SET_CUR_FOUND_MATCH: //groupId
      return { ...state, foundMatch: action.payload }
    case SET_CUR_PROFILE:
      switch (action.page) {
        case NOTIFICATIONS_PAGE:
          return { ...state, notifications_profile: action.payload }
        case TEMP_GROUPS_PAGE:
          return { ...state, temp_groups_profile: action.payload }
        case PERM_GROUPS_PAGE:
          return { ...state, perm_groups_profile: action.payload }
        case PROFILE_PAGE:
          return { ...state, profile_profile: action.payload }
      }

    default:
      return state
  }
}

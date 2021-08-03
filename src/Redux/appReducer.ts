import { combineReducers } from "redux"
import chatReducer from "./Reducers/chatReducer"
import profileReducer from "./Reducers/profileReducer"
import userSessionReducer from "./Reducers/userSessionReducer"
import friendReducer from "./Reducers/friendReducer"
import groupsReducer from "./Reducers/groupsReducer"
import eventsReducer from "./Reducers/eventsReducer"
import matchesReducer from "./Reducers/matchesReducer"
import foundMatchesReducer from "./Reducers/foundMatchesReducer"
import loadedProfilesReducer from "./Reducers/loadedProfilesReducer"
import notificationReducer from "./Reducers/notificationReducer"

const rootReducer = combineReducers({
  userSession: userSessionReducer,
  profile: profileReducer,
  chats: chatReducer,
  friends: friendReducer,
  groups: groupsReducer,
  events: eventsReducer,
  matches: matchesReducer,
  foundMatches: foundMatchesReducer,
  loadedProfiles: loadedProfilesReducer,
  notifications: notificationReducer,
})
export default rootReducer

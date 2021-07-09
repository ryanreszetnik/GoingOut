import {combineReducers} from 'redux';
import chatReducer from './chatReducer';
import profileReducer from './profileReducer';
import userSessionReducer from './userSessionReducer';
import friendReducer from "./friendReducer";
import permGroupsReducer from "./permGroupsReducer";
import tempGroupsReducer from "./tempGroupsReducer";
import matchesReducer from "./matchesReducer";
import foundMatchesReducer from "./foundMatchesReducer";
import currentReducer from "./currentReducer";



const rootReducer = combineReducers({
    userSession:userSessionReducer,
    profile:profileReducer,
    chats:chatReducer,
    friends:friendReducer,
    current:currentReducer,
    permGroups:permGroupsReducer,
    tempGroups:tempGroupsReducer,
    matches:matchesReducer,
    foundMatches:foundMatchesReducer,
});
export default rootReducer;
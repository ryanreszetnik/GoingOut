import {combineReducers} from 'redux';
import chatReducer from './chatReducer';
import groupsReducer from './groupsReducer';
import profileReducer from './profileReducer';
import userSessionReducer from './userSessionReducer';
import friendReducer from "./friendReducer"
import potentialMatchesReducer from "./potentialMatchesReducer"


const rootReducer = combineReducers({
    userSession:userSessionReducer,
    profile:profileReducer,
    groups:groupsReducer,
    chats:chatReducer,
    friends:friendReducer,
    potentialMatches:potentialMatchesReducer
});
export default rootReducer;
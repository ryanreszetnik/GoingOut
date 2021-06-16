import {combineReducers} from 'redux';
import chatReducer from './chatReducer';
import groupsReducer from './groupsReducer';
import profileReducer from './profileReducer';
import userSessionReducer from './userSessionReducer';
import friendReducer from "./friendReducer"


const rootReducer = combineReducers({
    userSession:userSessionReducer,
    profile:profileReducer,
    groups:groupsReducer,
    chats:chatReducer,
    friends:friendReducer
});
export default rootReducer;
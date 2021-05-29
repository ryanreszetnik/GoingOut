import {combineReducers} from 'redux';
import chatReducer from './chatReducer';
import groupsReducer from './groupsReducer';
import profileReducer from './profileReducer';
import userSessionReducer from './userSessionReducer';


const rootReducer = combineReducers({
    userSession:userSessionReducer,
    profile:profileReducer,
    groups:groupsReducer,
    tempGroups:groupsReducer,
    chats:chatReducer
});
export default rootReducer;
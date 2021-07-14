import store from '../Store/store'
import { Match } from '../Types/common.types';
import {Message,Group,EditGroup,EditTempGroup,CreateTempGroup} from '../Types/socketDTO.types'
import { ACCEPT_MATCH, ADD_PERM_GROUP_MEMBERS, ADD_TEMP_GROUP_MEMBERS, CREATE_PERM_GROUP, CREATE_TEMP_GROUP, DELETE_TEMP_GROUP, EDIT_PERM_GROUP, EDIT_TEMP_GROUP, LEAVE_PERM_GROUP, LEAVE_TEMP_GROUP, REQUEST_MERGE, SEND_FRIEND_REQUEST, SEND_MESSAGE } from './socket.constants';
let socket = null;
function updateSocket(){
  const state = store.getState();
  try{
    socket = state.userSession.socket;
  }catch(e){
    console.log("socket or sub does not exist")
  }
}
store.subscribe(updateSocket);
const socketSend = (action, data) => {
  console.log("sending",action,data)
  if(!socket){
    socket.connect()
  }
  try {
    socket.send(
      JSON.stringify({
        action,
        data,
      })
    );
  } catch (e) {
    console.log(e);
  }
};

//Messages
export const sendMessage = (message:Message)=>{
    socketSend(SEND_MESSAGE,message)
}
export const updateFriendRequest = (friendSub:string, confirm:boolean)=>{
  socketSend(SEND_FRIEND_REQUEST,{friendSub,confirm})
}
//Perm Group Methods
export const createPermGroup = (group:Group)=>{
  socketSend(CREATE_PERM_GROUP,group)
}
export const editPermGroup = (group:EditGroup)=>{
  socketSend(EDIT_PERM_GROUP, group)
}
export const addPermGroupMembers = (groupId:string, subs:string[])=>{
  socketSend(ADD_PERM_GROUP_MEMBERS, {groupId, subs})
}
export const leavePermGroup = (group:Group, leave:boolean)=>{
  socketSend(LEAVE_PERM_GROUP, {group, leave})
}
//Temp group Methods
export const createTempGroup = (group:CreateTempGroup) => {
  socketSend(CREATE_TEMP_GROUP, group)
};
export const deleteTempGroup = (groupId:string) => {
  socketSend(DELETE_TEMP_GROUP, groupId)
};
export const editTempGroup = (group:EditTempGroup) => {
  socketSend(EDIT_TEMP_GROUP, group)
};
export const addTempGroupMembers = (groupId:string, subs:string[]) => {
  socketSend(ADD_TEMP_GROUP_MEMBERS, {groupId, subs})
};
export const leaveTempGroup = (groupId:string) => {
  socketSend(LEAVE_TEMP_GROUP, groupId)
};

//Matching Methods
export const matchWithGroup = (groupId:string, matchId:string, otherGroupId:string)=>{
  socketSend(ACCEPT_MATCH, {groupId, matchId, otherGroupId})
};
export const sendMergeRequest = (data) => {
  socketSend(REQUEST_MERGE, data)
};


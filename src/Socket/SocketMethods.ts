import store from '../Store/store'
import {Message,Group,EditGroup,EditTempGroup,CreateTempGroup} from '../Types/socketDTO.types'
import { CREATE_PERM_GROUP, SEND_FRIEND_REQUEST, SEND_MESSAGE } from './socket.constants';
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
  console.log("Edit Group",group)
}
export const addPermGroupMembers = (groupId:string, members:string[])=>{}
export const leavePermGroup = (groupId:string)=>{}
//Temp group Methods
export const createTempGroup = (group:CreateTempGroup) => {};
export const deleteTempGroup = (groupId:string) => {};
export const editTempGroup = (group:EditTempGroup) => {};
export const addTempGroupMembers = (groupId:string, members:string[]) => {};
export const leaveTempGroup = (groupId:string) => {};
//Matching Methods
export const matchWithGroup = (baseGroup:string, requestGroup:string)=>{};
export const sendMergeRequest = (baseGroup:string, matchId:string) => {};


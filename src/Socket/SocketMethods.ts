import store from '../Redux/store'
import {Message,Group,EditGroup,EditEvent,CreateEvent} from '../Types/socketDTO.types'
import { SOCKET_SEND_ACCEPT_MATCH, SOCKET_SEND_ADD_GROUP_MEMBERS, SOCKET_SEND_ADD_EVENT_MEMBERS, SOCKET_SEND_CREATE_GROUP, SOCKET_SEND_CREATE_EVENT, SOCKET_SEND_DELETE_EVENT, SOCKET_SEND_EDIT_GROUP, SOCKET_SEND_EDIT_EVENT, SOCKET_SEND_LEAVE_GROUP, SOCKET_SEND_LEAVE_EVENT, SOCKET_SEND_REQUEST_MERGE, SOCKET_SEND_FRIEND_REQUEST, SOCKET_SEND_MESSAGE } from '../Constants/outgoing-socket';
import { ADD_CHAT,ADD_GROUP_MEMBERS } from '../Constants/reducerEvents'

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
export const sendMessageGroup = (message:Message)=>{
  store.dispatch({ type: ADD_CHAT, payload: message })
  socketSend(SOCKET_SEND_MESSAGE,{message,type:"PERMGROUP"})
}
export const sendMessageEvent = (message:Message)=>{
  store.dispatch({ type: ADD_CHAT, payload: message })
  socketSend(SOCKET_SEND_MESSAGE,{message,type:"EVENT"})
}
export const sendMessageMatch = (message:Message, event)=>{
  store.dispatch({ type: ADD_CHAT, payload: message })
  socketSend(SOCKET_SEND_MESSAGE,{message,type:"MATCH",event})
}
export const updateFriendRequest = (friendSub:string, confirm:boolean)=>{
  socketSend(SOCKET_SEND_FRIEND_REQUEST,{friendSub,confirm})
}
//Perm Group Methods
export const createGroup = (group:Group)=>{
  socketSend(SOCKET_SEND_CREATE_GROUP,group)
}
export const editGroup = (group:EditGroup)=>{
  socketSend(SOCKET_SEND_EDIT_GROUP, group)
}
export const addGroupMembers = (groupId:string, subs:string[])=>{
  store.dispatch({ type: ADD_GROUP_MEMBERS, payload: {groupId,subs} })
  socketSend(SOCKET_SEND_ADD_GROUP_MEMBERS, {groupId, subs})
}
export const leaveGroup = (group:string, leave:boolean)=>{
  socketSend(SOCKET_SEND_LEAVE_GROUP, {group, leave})
}
//Temp group Methods
export const createEvent = (group:any,fromPerm:boolean) => {
  console.log("sending create event", group)
  socketSend(SOCKET_SEND_CREATE_EVENT, {event:group,createdFromPerm:fromPerm})
};
export const editEvent = (group:EditEvent) => {
  socketSend(SOCKET_SEND_EDIT_EVENT, group)
};
export const addEventMembers = (eventId:string, subs:string[]) => {
  socketSend(SOCKET_SEND_ADD_EVENT_MEMBERS, {eventId, subs})
};
export const leaveEvent = (eventId:string, leave:boolean) => {
  socketSend(SOCKET_SEND_LEAVE_EVENT, {eventId, leave})
};

//Matching Methods
export const matchWithEvent = (eventId:string, matchId:string, otherEventId:string)=>{
  socketSend(SOCKET_SEND_ACCEPT_MATCH, {eventId, matchId, otherEventId})
};
export const sendMergeRequest = (data) => {
  socketSend(SOCKET_SEND_REQUEST_MERGE, data)
};


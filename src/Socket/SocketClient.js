import React, { Fragment, useEffect, useState } from "react";
import { socketURL } from "../aws-exports";
import { useDispatch, useSelector, batch } from "react-redux";
import { SET_SOCKET, SET_USER_GROUPS } from "../Actions/authActions";
import { ADD_CHAT } from "../Actions/chatActions";
import { FRIEND_UPDATE, MESSAGE_SENT, NEW_PERM_GROUP, RECEIVE_MESSAGE } from "./socket.constants";
import { UPDATE_FRIEND, ADD_FRIEND, REMOVE_FRIEND } from "../Actions/friendActions";
import { ADD_PERM_GROUP } from "../Actions/groupActions";

export default function SocketClient() {
  const [localSocket,setLocalSocket] = useState(null);
  const token = useSelector(
    (state) => state.userSession.user.signInUserSession.accessToken.jwtToken
  )
  const groups = useSelector((state) => state.groups.permGroups);
  const dispatch = useDispatch()

    const updateFriend= (body)=>{
      console.log(body.status)
      if(body.status==="NOTHING"){
       //remove friend
       dispatch({ type: REMOVE_FRIEND, payload: body });
      }else if(body.status ==="CONFIRMED"){
        //update friend
        dispatch({ type: UPDATE_FRIEND, payload: body });
      }else{
        //add friend
        dispatch({ type: ADD_FRIEND, payload: body });
      }
    }

    useEffect(() => {
      console.log("socket now", localSocket?localSocket.readyState:"No socket");
    }, [localSocket]);

  useEffect(() => {

    const socket = new WebSocket(`${socketURL}?token=${token}`);
    
    
    socket.onopen=function(event){
      dispatch({ type: SET_SOCKET, payload: socket });
    }
   
    socket.onerror=function(event){
      console.log("SOCKET ERROR",event)
    }
    socket.onmessage=function(event){
      let data;
      let body;
      try{
       data = JSON.parse(event.data)
       body = data.body
      }catch(e){
         console.log("No event data: ", event);
        return;

      }
      if (!data.action) {
        console.log("No event action: ", event)
        return
      }

      //add more cases as needed
      switch (data.action) {
        case RECEIVE_MESSAGE:
          dispatch({ type: ADD_CHAT, payload: body });
          break;
        case MESSAGE_SENT:
          console.log("Message Sent Success:", body);
          break;
        case FRIEND_UPDATE:
          updateFriend(body);
          break;
        case NEW_PERM_GROUP:
          batch(() => {
            dispatch({
              type: ADD_PERM_GROUP,
              payload: body,
            });
            dispatch({
              type: SET_USER_GROUPS,
              payload: groups.map((group) => group.groupId),
            })
          })
        break;

        default:
          console.log("No Event Action Match", event)
      }
    }

    return () => socket.close()
  }, [])

  return <Fragment />
}

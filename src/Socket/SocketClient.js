import React, { Fragment, useEffect, useState } from "react";
import { socketURL } from "../aws-exports";
import { useDispatch, useSelector } from "react-redux";
import { SET_SOCKET } from "../Actions/authActions";
import { ADD_CHAT } from "../Actions/chatActions";

export default function SocketClient() {
  const token = useSelector(
    (state) => state.userSession.user.signInUserSession.accessToken.jwtToken
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = new WebSocket(`${socketURL}?token=${token}`);
    dispatch({ type: SET_SOCKET,payload:socket });
    socket.onmessage=function(event){
      let data;
      try{
       data = JSON.parse(event.data)
      }catch(e){
         console.log("No event data: ", event);
        return;
      }
      if(!data.action){
        console.log("No event action: ", event);
        return;
      }
      switch(data.action){
        case "recieveMessage":
          console.log("Message",data.body)
          dispatch({ type: ADD_CHAT, payload: data.body });
          break;
        case "messageSent":
          console.log("Message Sent", data.body);  
          break;
        default:
          console.log("No Event Action Match", event);
      }
    }
    
    return () => socket.close(); 
  }, []);
  
  return <Fragment/>;
}

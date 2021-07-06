import React, { Fragment, useEffect, useState } from "react";
import { socketURL } from "../aws-exports";
import { useDispatch, useSelector } from "react-redux";
import { SET_SOCKET } from "../Actions/authActions";

export default function SocketClient() {
  const token = useSelector(
    (state) => state.userSession.user.signInUserSession.accessToken.jwtToken
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = new WebSocket(`${socketURL}?token=${token}`);
    dispatch({ type: SET_SOCKET,payload:socket });
    
    
    return () => socket.close(); 
  }, []);
  
  return <Fragment/>;
}

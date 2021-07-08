import React, { Fragment, useEffect, useState } from "react"
import { socketURL } from "../aws-exports"
import { useDispatch, useSelector } from "react-redux"
import { SET_SOCKET } from "../Actions/authActions"
import { ADD_CHAT } from "../Actions/chatActions"
import {
  MATCH_ACCEPTED,
  MESSAGE_SENT,
  RECEIVE_MESSAGE,
} from "./socket.constants"
import { ADD_MATCH } from "../Actions/groupActions"

export default function SocketClient() {
  const token = useSelector(
    (state) => state.userSession.user.signInUserSession.accessToken.jwtToken
  )
  const dispatch = useDispatch()
  useEffect(() => {
    const socket = new WebSocket(`${socketURL}?token=${token}`)
    dispatch({ type: SET_SOCKET, payload: socket })
    socket.onmessage = function (event) {
      let data
      let body
      try {
        data = JSON.parse(event.data)
        body = data.body
      } catch (e) {
        console.log("No event data: ", event)
        return
      }
      if (!data.action) {
        console.log("No event action: ", event)
        return
      }

      //add more cases as needed
      switch (data.action) {
        case RECEIVE_MESSAGE:
          dispatch({ type: ADD_CHAT, payload: body })
          break
        case MESSAGE_SENT:
          console.log("Message Sent Success:", body)
          break
        case MATCH_ACCEPTED:
          dispatch({ type: ADD_MATCH, payload: body })
        default:
          console.log("No Event Action Match", event)
      }
    }

    return () => socket.close()
  }, [])

  return <Fragment />
}

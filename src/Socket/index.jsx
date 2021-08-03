import React, { Fragment, useEffect, useState } from "react"
import { socketURL } from "../Constants/aws-exports"
import { useDispatch, useSelector, batch } from "react-redux"
import {
  SET_SOCKET,
  SET_USER_GROUPS,
  ADD_CHAT,
  UPDATE_FRIEND,
  ADD_FRIEND,
  REMOVE_FRIEND,
  ADD_MATCH,
  ADD_GROUP,
  ADD_GROUP_MEMBERS,
  ADD_EVENT,
  ADD_EVENT_MEMBERS,
  EDIT_GROUP,
  EDIT_EVENT,
  REMOVE_MATCH,
  REMOVE_GROUP,
  REMOVE_GROUP_MEMBERS,
  REMOVE_EVENT,
  REMOVE_EVENT_MEMBERS,
  ADD_NOTIFICATION,
} from "../Constants/reducerEvents"
import {
  SOCKET_RECEIVE_MESSAGE,
  SOCKET_RECEIVE_MESSAGE_SENT,
  SOCKET_RECEIVE_FRIEND_UPDATE,
  SOCKET_REVIEVE_NEW_GROUP,
  SOCKET_REVIEVE_EVENTS_MERGED,
  SOCKET_REVIEVE_MATCH_ACCEPTED,
  SOCKET_RECEIVE_GROUP_UPDATED,
  SOCKET_RECEIVE_EVENT_UPDATED,
  SOCKET_RECEIVE_NEW_EVENT,
  SOCKET_RECEIVE_GROUP_MEMBERS_ADDED,
  SOCKET_RECEIVE_EVENT_MEMBERS_ADDED,
  SOCKET_RECEIVE_EVENT_LEFT,
  SOCKET_RECEIVE_EVENT_OTHER_LEFT,
  SOCKET_RECEIVE_GROUP_LEFT,
  SOCKET_RECEIVE_GROUP_OTHER_LEFT,
  SOCKET_RECEIVE_NEW_NOTIFICATION,
} from "../Constants/incoming-socket"

export default function SocketClient() {
  const globalSocket = useSelector((state) => state.userSession.socket)
  const token = useSelector(
    (state) => state.userSession.user.signInUserSession.accessToken.jwtToken
  )
  const groups = useSelector((state) => state.groups)
  const dispatch = useDispatch()
  let socket = null
  var timerId = 0
  function keepAlive() {
    var timeout = 60000 //570000
    if (globalSocket && globalSocket.readyState === globalSocket.OPEN) {
      console.log("sending ping")
      globalSocket.send("")
    } else if (globalSocket.readyState === globalSocket.CLOSED) {
      cancelKeepAlive()
      console.log("could not send ping... restarting")
      restartConnection()
    }
    timerId = setTimeout(keepAlive, timeout)
  }
  function cancelKeepAlive() {
    if (timerId) {
      clearTimeout(timerId)
    }
  }
  const restartConnection = () => {
    socket = new WebSocket(`${socketURL}?token=${token}`)
    dispatch({ type: SET_SOCKET, payload: socket })
  }
  const updateFriend = (body) => {
    console.log(body.status)
    if (body.status === "NOTHING") {
      //remove friend
      dispatch({ type: REMOVE_FRIEND, payload: body })
    } else if (body.status === "CONFIRMED") {
      //update friend
      dispatch({ type: UPDATE_FRIEND, payload: body })
    } else {
      //add friend
      dispatch({ type: ADD_FRIEND, payload: body })
    }
  }

  useEffect(() => {
    restartConnection()
  }, [])
  useEffect(() => {
    if (globalSocket) {
      globalSocket.onopen = function (event) {
        console.log("Socket Connected")
        cancelKeepAlive()
        keepAlive()
      }
      globalSocket.onclose = function (event) {
        console.log("Socket Disconnected")
        cancelKeepAlive()
      }

      globalSocket.onerror = function (event) {
        console.log("SOCKET ERROR", event)
      }
      globalSocket.onmessage = function (event) {
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
          console.log("No event action: ", event, data)
          return
        }
        console.log("Recieved", data)
        //add more cases as needed
        switch (data.action) {
          case SOCKET_RECEIVE_MESSAGE:
            dispatch({ type: ADD_CHAT, payload: body })
            break
          case SOCKET_RECEIVE_MESSAGE_SENT:
            console.log("Message Sent Success:", body)
            break
          case SOCKET_RECEIVE_FRIEND_UPDATE:
            updateFriend(body)
            break
          case SOCKET_REVIEVE_NEW_GROUP:
            batch(() => {
              dispatch({
                type: ADD_GROUP,
                payload: body,
              })
              dispatch({
                type: SET_USER_GROUPS,
                payload: groups.map((group) => group.groupId),
              })
            })
            break
          case SOCKET_REVIEVE_EVENTS_MERGED:
            batch(() => {
              dispatch({ type: ADD_EVENT, payload: body })
              dispatch({ type: REMOVE_MATCH, payload: body.eventId })
            })
            break
          case SOCKET_REVIEVE_MATCH_ACCEPTED:
            dispatch({ type: ADD_MATCH, payload: body })
            break
          case SOCKET_RECEIVE_GROUP_UPDATED:
            dispatch({ type: EDIT_GROUP, payload: body })
            break
          case SOCKET_RECEIVE_EVENT_UPDATED:
            dispatch({ type: EDIT_EVENT, payload: body })
            break
          case SOCKET_RECEIVE_NEW_EVENT:
            dispatch({ type: ADD_EVENT, payload: body })
            break
          case SOCKET_RECEIVE_GROUP_MEMBERS_ADDED:
            dispatch({ type: ADD_GROUP_MEMBERS, payload: body })
            break
          case SOCKET_RECEIVE_EVENT_MEMBERS_ADDED:
            dispatch({ type: ADD_EVENT_MEMBERS, payload: body })
            break
          case SOCKET_RECEIVE_EVENT_LEFT:
            dispatch({ type: REMOVE_EVENT, payload: body.eventId })
            break
          case SOCKET_RECEIVE_EVENT_OTHER_LEFT:
            dispatch({
              type: REMOVE_EVENT_MEMBERS,
              payload: { eventId: body.eventId, members: body.members },
            })
            break
          case SOCKET_RECEIVE_GROUP_LEFT:
            dispatch({ type: REMOVE_GROUP, payload: body.groupId })
            break
          case SOCKET_RECEIVE_GROUP_OTHER_LEFT:
            dispatch({
              type: REMOVE_GROUP_MEMBERS,
              payload: { groupId: body.groupId, members: body.members },
            })
            break
          case SOCKET_RECEIVE_NEW_NOTIFICATION:
            dispatch({ type: ADD_NOTIFICATION, payload: body })
            break
          default:
            console.log("No Event Action Match", event)
        }
      }

      return () => {
        cancelKeepAlive()
        globalSocket.close()
      }
    }
  }, [globalSocket])

  return <Fragment />
}

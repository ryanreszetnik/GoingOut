import React, { Fragment, useEffect, useState } from "react"
import { socketURL } from "../aws-exports"
import { useDispatch, useSelector, batch } from "react-redux"
import { SET_SOCKET, SET_USER_GROUPS } from "../Actions/authActions"
import { ADD_CHAT } from "../Actions/chatActions"
import {
  ADD_PERM_GROUP_MEMBERS,
  FRIEND_UPDATE,
  GROUPS_MERGED,
  LEAVE_TEMP_GROUP,
  MATCH_ACCEPTED,
  MESSAGE_SENT,
  NEW_PERM_GROUP,
  NEW_TEMP_GROUP,
  PERM_GROUP_LEFT,
  PERM_GROUP_MEMBERS_ADDED,
  PERM_GROUP_OTHER_LEFT,
  PERM_GROUP_UPDATED,
  RECEIVE_MESSAGE,
  TEMP_GROUP_LEFT,
  TEMP_GROUP_OTHER_LEFT,
} from "./socket.constants"
import {
  UPDATE_FRIEND,
  ADD_FRIEND,
  REMOVE_FRIEND,
} from "../Actions/friendActions"
import {
  ADD_MATCH,
  ADD_PERM_GROUP,
  ADD_PERM_MEMBERS,
  ADD_TEMP_GROUP,
  ADD_TEMP_TO_PERM,
  EDIT_PERM_GROUP,
  REMOVE_MATCH,
  REMOVE_PERM_GROUP,
  REMOVE_PERM_MEMBERS,
  REMOVE_TEMP_GROUP,
  REMOVE_TEMP_MEMBERS,
} from "../Actions/groupActions"

export default function SocketClient() {
  const [localSocket, setLocalSocket] = useState(null)
  const token = useSelector(
    (state) => state.userSession.user.signInUserSession.accessToken.jwtToken
  )
  const groups = useSelector((state) => state.permGroups)
  const dispatch = useDispatch()

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
    console.log(
      "socket now",
      localSocket ? localSocket.readyState : "No socket"
    )
  }, [localSocket])

  useEffect(() => {
    let socket = new WebSocket(`${socketURL}?token=${token}`)

    socket.onopen = function (event) {
      dispatch({ type: SET_SOCKET, payload: socket })
    }
    socket.onclose = function (e) {
      console.log(
        "Socket is closed. Reconnect will be attempted in 1 second.",
        e.reason
      )
      setTimeout(function () {
        try {
          socket.connect()
        } catch (e) {
          socket = new WebSocket(`${socketURL}?token=${token}`)
        }
      }, 1000)
    }

    socket.onerror = function (event) {
      console.log("SOCKET ERROR", event)
    }
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
      console.log("Recieved", data)
      //add more cases as needed
      switch (data.action) {
        case RECEIVE_MESSAGE:
          dispatch({ type: ADD_CHAT, payload: body })
          break
        case MESSAGE_SENT:
          console.log("Message Sent Success:", body)
          break
        case FRIEND_UPDATE:
          updateFriend(body)
          break
        case NEW_PERM_GROUP:
          batch(() => {
            dispatch({
              type: ADD_PERM_GROUP,
              payload: body,
            })
            dispatch({
              type: SET_USER_GROUPS,
              payload: groups.map((group) => group.groupId),
            })
          })
          break
        case GROUPS_MERGED:
          batch(() => {
            dispatch({ type: ADD_TEMP_GROUP, payload: body })
            dispatch({ type: REMOVE_MATCH, payload: body.groupId })
          })
          break
        case MATCH_ACCEPTED:
          dispatch({ type: ADD_MATCH, payload: body })
          break
        case PERM_GROUP_UPDATED:
          dispatch({ type: EDIT_PERM_GROUP, payload: body })
          break
        case NEW_TEMP_GROUP:
          dispatch({ type: ADD_TEMP_GROUP, payload: body })
          break
        case PERM_GROUP_MEMBERS_ADDED:
          dispatch({ type: ADD_PERM_MEMBERS, payload: body })
          break
        case TEMP_GROUP_LEFT:
          dispatch({ type: REMOVE_TEMP_GROUP, payload: body.groupId })
          break
        case TEMP_GROUP_OTHER_LEFT:
          dispatch({
            type: REMOVE_TEMP_MEMBERS,
            payload: { groupId: body.groupId, members: body.members },
          })
          break
        case PERM_GROUP_LEFT:
          dispatch({ type: REMOVE_PERM_GROUP, payload: body.groupId })
          break
        case PERM_GROUP_OTHER_LEFT:
          dispatch({
            type: REMOVE_PERM_MEMBERS,
            payload: { groupId: body.groupId, members: body.members },
          })
        default:
          console.log("No Event Action Match", event)
      }
    }

    return () => socket.close()
  }, [])

  return <Fragment />
}

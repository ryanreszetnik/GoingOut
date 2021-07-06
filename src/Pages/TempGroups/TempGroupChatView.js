import React from "react"
import { View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Chat from "../../../Components/Chat"
import uuid from "react-native-uuid"
import moment from "moment"
import { sendMessage } from "../../Endpoints/chatEndpoints"
import { ADD_CHAT } from "../../Actions/chatActions"

export default function TempGroupChatView() {
  const curID = useSelector((state) => state.groups.curTempGroup)
  const chat = useSelector((state) =>
    state.chats.find((chat) => chat.groupId === curID)
  )
  const socket = useSelector((state) => state.userSession.socket)
  const messages = chat ? chat.messages : []
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const sendMess = async (text) => {
    const newMessage = {
      datetime: moment(),
      groupId: curID,
      messageId: uuid.v4(),
      message: text,
      sender: { name: profile.name, username: profile.username },
    }

    dispatch({ type: ADD_CHAT, payload: newMessage })
    try {
      // console.log(await sendMessage(newMessage));
      socket.send(
        JSON.stringify({
          action: "sendMessage",
          data: newMessage,
        })
      )
    } catch (e) {
      console.log(e)
    }

    console.log(JSON.stringify(newMessage))
  }

  return (
    <View>
      <Chat sendMessage={sendMess} messages={messages} />
    </View>
  )
}

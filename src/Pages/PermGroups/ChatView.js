import React from "react"
import { View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Chat from "../../../Components/Chat"
import uuid from "react-native-uuid"
import moment from "moment"

import { ADD_CHAT } from "../../Actions/chatActions"
import { sendMessage } from "../../Socket/SocketMethods"

export default function ChatView() {
  const curID = useSelector((state) => state.groups.curGroup)
  const chat = useSelector((state) =>
    state.chats.find((chat) => chat.groupId === curID)
  )
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
    sendMessage(newMessage)

    console.log(JSON.stringify(newMessage))
  }

  
  return (
    <View>
      <Chat sendMessage={sendMess} messages={messages} />
    </View>
  );
}



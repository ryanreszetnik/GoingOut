import React from "react"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import Chat from "../../CommonPages/Chat"
import uuid from "react-native-uuid"
import moment from "moment"

import { sendMessageGroup } from "../../Socket/socketMethods"

export default function ChatView({ route }) {
  const { groupId } = route.params

  const chat = useSelector((state) =>
    state.chats.find((chat) => chat.groupId === groupId)
  )
  const messages = chat ? chat.messages : []
  const profile = useSelector((state) => state.profile)

  const sendMess = async (text) => {
    const newMessage = {
      datetime: moment(),
      groupId: groupId,
      messageId: uuid.v4(),
      message: text,
      sender: { name: profile.name, username: profile.username },
    }

    sendMessageGroup(newMessage)

    console.log(JSON.stringify(newMessage))
  }

  return (
    <View>
      <Chat sendMessage={sendMess} messages={messages} />
    </View>
  )
}

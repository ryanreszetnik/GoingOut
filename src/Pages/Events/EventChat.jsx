import React from "react"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import Chat from "../../CommonPages/Chat"
import uuid from "react-native-uuid"
import moment from "moment"
import { ADD_CHAT } from "../../Constants/reducerEvents"
import { sendMessageEvent } from "../../Socket/socketMethods"

export default function EventChat({ route }) {
  const { eventId } = route.params

  const baseGroups = useSelector(
    (state) => state.events.find((gr) => gr.eventId === eventId).baseGroups
  )
  const groups = useSelector((state) => state.groups)
  const chatId =
    baseGroups.length === 1 && groups.some((gr) => gr.groupId === baseGroups[0])
      ? baseGroups[0]
      : eventId
  const chat = useSelector((state) =>
    state.chats.find((chat) => chat.groupId === chatId)
  )
  const socket = useSelector((state) => state.userSession.socket)
  const messages = chat ? chat.messages : []
  const profile = useSelector((state) => state.profile)

  const sendMess = async (text) => {
    const newMessage = {
      datetime: moment(),
      groupId: eventId,
      messageId: uuid.v4(),
      message: text,
      sender: { name: profile.name, username: profile.username },
    }

    sendMessageEvent(newMessage)

    console.log(JSON.stringify(newMessage))
  }

  return (
    <View>
      <Chat sendMessage={sendMess} messages={messages} />
    </View>
  )
}

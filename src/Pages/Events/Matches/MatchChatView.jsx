import uuid from "react-native-uuid"
import moment from "moment"
import React from "react"
import { View } from "react-native"
import { useSelector } from "react-redux"
import Chat from "../../../CommonPages/Chat"
import { ADD_CHAT } from "../../../Constants/reducerEvents"
import { sendMessageMatch } from "../../../Socket/SocketMethods"
export default function MatchChatView({ navigation, route }) {
  const { matchId, eventId } = route.params
  const chat = useSelector((state) =>
    state.chats.find((chat) => chat.groupId === matchId)
  )

  const messages = chat ? chat.messages : []
  const profile = useSelector((state) => state.profile)
  const sendMess = async (text) => {
    const newMessage = {
      datetime: moment(),
      groupId: matchId,
      messageId: uuid.v4(),
      message: text,
      sender: { name: profile.name, username: profile.username },
    }

    sendMessageMatch(newMessage, eventId)

    console.log(JSON.stringify(newMessage))
  }
  return (
    <View>
      <Chat messages={messages} sendMessage={sendMess} />
    </View>
  )
}

import uuid from "react-native-uuid"
import moment from "moment"
import React from "react"
import { View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Chat from "../../../../Components/Chat"
import { ADD_CHAT } from "../../../Actions/chatActions"
import { sendMessageMatch } from "../../../Socket/SocketMethods"
export default function MatchChatView({ navigation }) {
  const curMatchId = useSelector((state) => state.current.match)
  const curTempGroup = useSelector((state) => state.current.tempGroup)
  const chat = useSelector((state) =>
    state.chats.find((chat) => chat.groupId === curMatchId)
  )

  const messages = chat ? chat.messages : []
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const sendMess = async (text) => {
    const newMessage = {
      datetime: moment(),
      groupId: curMatchId,
      messageId: uuid.v4(),
      message: text,
      sender: { name: profile.name, username: profile.username },
    }

    dispatch({ type: ADD_CHAT, payload: newMessage })
    sendMessageMatch(newMessage, curTempGroup)

    console.log(JSON.stringify(newMessage))
  }
  return (
    <View>
      <Chat messages={messages} sendMessage={sendMess} />
    </View>
  )
}

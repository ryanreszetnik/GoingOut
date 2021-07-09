import React from "react"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import Chat from "../../../../Components/Chat"
export default function MatchChatView({ navigation }) {
  const curMatchId = useSelector((state) => state.current.match);
  const curMatch = useSelector(state=>state.matches.find(match=>match.matchId===curMatchId))
  
  const sendMessage=()=>{

  }
  const messages = []
  const groupId = "Some Group"
  return (
    <View>
      
      <Chat messages={messages} sendMessage={sendMessage}/>
    </View>
  );
}

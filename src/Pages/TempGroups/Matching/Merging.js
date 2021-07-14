import React, { useState } from "react"
import { View, Text, Button } from "react-native"
import { useSelector } from "react-redux"
import AppButton from "../../../../Components/AppButton"
import AppTextInput from "../../../../Components/AppTextInput"
import { sendMergeRequest } from "../../../Socket/SocketMethods"

export default function Merging({ navigation }) {
  const baseGroupId = useSelector((state) => state.current.tempGroup)
  const baseGroup = useSelector((state) => state.tempGroups).find(
    (group) => group.groupId === baseGroupId
  )
  const curMatchId = useSelector((state) => state.current.match)
  const curMatch = useSelector((state) =>
    state.matches.find(
      (group) => group.matchId === curMatchId && group.groupId === baseGroupId
    )
  )
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const onMerge = () => {
    console.log(curMatch)
    const data = {
      matchId: curMatch.matchId,
      baseGroupId,
      otherGroupId: curMatch.otherGroup.groupId,
      name,
      bio,
    }
    // console.log(data)
    navigation.navigate("View Temp Groups")
    sendMergeRequest(data)
  }

  return (
    <View>
      <AppTextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter name"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <AppTextInput
        value={bio}
        onChangeText={(text) => setBio(text)}
        placeholder="Enter bio"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <AppButton onPress={onMerge} title="Merge" />
      <Text></Text>
    </View>
  )
}

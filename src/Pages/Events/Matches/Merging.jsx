import React, { useState } from "react"
import { View, Text, Button } from "react-native"
import { useSelector } from "react-redux"
import AppButton from "../../../Components/AppButton"
import AppTextInput from "../../../Components/AppTextInput"
import { EVENTS_VIEW } from "../../../Constants/screens"
import { sendMergeRequest } from "../../../Socket/socketMethods"

export default function Merging({ navigation, route }) {
  const { eventId, matchId } = route.params
  const curMatch = useSelector((state) =>
    state.matches.find(
      (group) => group.matchId === matchId && group.eventId === eventId
    )
  )
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const onMerge = () => {
    console.log(curMatch)
    const data = {
      matchId: curMatch.matchId,
      baseGroupId: eventId,
      otherEventId: curMatch.otherEvent.eventId,
      name,
      bio,
    }

    sendMergeRequest(data)
    navigation.navigate(EVENTS_VIEW)
  }

  return (
    <View>
      <AppTextInput
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder='Enter name'
        autoCapitalize='none'
        autoCorrect={false}
      />
      <AppTextInput
        value={bio}
        onChangeText={(text) => setBio(text)}
        placeholder='Enter bio'
        autoCapitalize='none'
        autoCorrect={false}
      />
      <AppButton onPress={onMerge} title='Merge' />
      <Text></Text>
    </View>
  )
}

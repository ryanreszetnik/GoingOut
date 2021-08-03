import React from "react"
import { View, Text } from "react-native"
import UserList from "../../../Components/UserList"
import { useSelector } from "react-redux"
import AppButton from "../../../Components/AppButton"
import { EVENTS_ADD_MEMBERS, EVENTS_PROFILE } from "../../../Constants/screens"

export default function MemberList({ navigation, route }) {
  const { eventId } = route.params
  const event = useSelector((state) =>
    state.events.find((group) => group.eventId === eventId)
  )
  const members = event ? event.members : []

  const onPress = (profile) => {
    navigation.navigate(EVENTS_PROFILE, { sub: profile })
  }
  return (
    <View>
      <UserList priority={4} subs={members} onPress={onPress} />
      <AppButton
        title="Add Members"
        onPress={() =>
          navigation.navigate(EVENTS_ADD_MEMBERS, { eventId: eventId })
        }
      />
    </View>
  )
}

import React from "react"
import { View, Text } from "react-native"
import UserList from "../../Components/UserList"
import { useSelector } from "react-redux"
import AppButton from "../../Components/AppButton"
import { GROUPS_ADD_MEMBERS, GROUPS_PROFILE } from "../../Constants/screens"
import { PAGE_BACKGROUND_COLOR } from "../../Theme/theme.style"

export default function MemberList({ navigation, route }) {
  const { groupId } = route.params

  const members = useSelector((state) =>
    state.groups.find((group) => group.groupId === groupId)
  ).members

  const onPress = (profile) => {
    navigation.navigate(GROUPS_PROFILE, { sub: profile })
  }
  return (
    <View style={{ backgroundColor: PAGE_BACKGROUND_COLOR, height: "100%" }}>
      <UserList priority={5} subs={members} onPress={onPress} />
      <AppButton
        title='Add Members'
        onPress={() =>
          navigation.navigate(GROUPS_ADD_MEMBERS, { groupId: groupId })
        }
      />
    </View>
  )
}

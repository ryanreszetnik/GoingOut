import React from "react"
import { View, Text } from "react-native"
import UserList from "../../../Components/UserList"
import { useSelector, useDispatch } from "react-redux"
import { SET_CUR_PROFILE } from "../../Actions/friendActions"

export default function MemberList({ navigation }) {
  const curID = useSelector((state) => state.groups.curGroup)
  const members = useSelector((state) =>
    state.groups.permGroups.find((group) => group.groupId === curID)
  ).members

  const dispatch = useDispatch()

  const onPress = (profile) => {
    dispatch({ type: SET_CUR_PROFILE, payload: profile })
    navigation.navigate("Member Profile")
  }
  return (
    <View>
      <UserList users={members} onPress={onPress} />
    </View>
  )
}

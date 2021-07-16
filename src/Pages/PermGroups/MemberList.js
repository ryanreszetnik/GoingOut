import React from "react"
import { View, Text } from "react-native"
import UserList from "../../../Components/UserList"
import { useSelector, useDispatch } from "react-redux"
import { SET_CUR_PROFILE } from "../../Actions/friendActions"
import AppButton from "../../../Components/AppButton"
import { PERM_GROUPS_PAGE } from "../../Constants/pageConstants"

export default function MemberList({ navigation }) {
  const curID = useSelector((state) => state.current.permGroup)
  const members = useSelector((state) =>
    state.permGroups.find((group) => group.groupId === curID)
  ).members

  const dispatch = useDispatch()

  const onPress = (profile) => {
    dispatch({
      type: SET_CUR_PROFILE,
      payload: profile,
      page: PERM_GROUPS_PAGE,
    })
    navigation.navigate("Member Profile")
  }
  return (
    <View>
      <UserList priority={5} subs={members} onPress={onPress} />
      <AppButton
        title="Add Members"
        onPress={() => navigation.navigate("Add Members")}
      />
    </View>
  )
}

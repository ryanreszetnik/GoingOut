import React from "react"
import { View, Text } from "react-native"
import FriendSearch from "../../../Components/FriendSearch"
import UserFriendList from "../../../Components/UserFriendList"
import { Friend } from "../../Types/common.types"
import { useSelector, useDispatch } from "react-redux"
import { ScrollView } from "react-native-gesture-handler"
import { SET_CUR_PROFILE } from "../../Actions/friendActions"

export default function Friends({ navigation }) {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.friends.curProfile)
  const onSelect = (profile) => {
    dispatch({ type: SET_CUR_PROFILE, payload: profile })
    navigation.navigate("User Profile")
  }

  return (
    <ScrollView>
      <UserFriendList sub={profile.sub} />
    </ScrollView>
  )
}

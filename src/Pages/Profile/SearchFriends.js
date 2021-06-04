import React from "react"
import { View, Text } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import FriendSearch from "../../../Components/FriendSearch"
import { SET_CUR_PROFILE } from "../../Actions/friendActions"

export default function SearchFriends({ navigation }) {
  const dispatch = useDispatch()
  const onSelect = (profile) => {
    dispatch({ type: SET_CUR_PROFILE, payload: profile })
    navigation.navigate("User Profile")
  }
  return (
    <View>
      <FriendSearch onSelect={onSelect} />
    </View>
  )
}

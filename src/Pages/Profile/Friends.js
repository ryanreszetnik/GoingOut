import React from "react"
import { View, Text } from "react-native"
import FriendList from "../../../Components/FriendList"
import { useSelector, useDispatch } from "react-redux"
import { ScrollView } from "react-native-gesture-handler"
import AppButton from "../../../Components/AppButton"

export default function Friends({ navigation }) {
  const dispatch = useDispatch()
  const friendList = useSelector((state) => state.friends)

  return (
    <ScrollView>
      <AppButton onPress={() => navigation.navigate("Search Friends")} />
      <FriendList />
    </ScrollView>
  )
}

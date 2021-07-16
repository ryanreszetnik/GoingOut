import React, { Fragment } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useSelector, useDispatch } from "react-redux"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import UserProfilePage from "../../../../Components/UserProfilePage"
export default function MemberProfile({ navigation }) {
  const currSub = useSelector((state) => state.current.temp_groups_profile)
  return (
    <UserProfilePage goToFriends={() => {}} sub={currSub} showFriends={false} />
  )
}

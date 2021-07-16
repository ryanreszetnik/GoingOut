import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useSelector, useDispatch } from "react-redux"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import UserProfilePage from "../../../Components/UserProfilePage"
export default function MemberProfile({ navigation }) {
  const currentSub = useSelector((state) => state.current.perm_groups_profile)
  return (
    <UserProfilePage
      goToFriends={() => {}}
      showFriends={false}
      sub={currentSub}
    />
  )
}

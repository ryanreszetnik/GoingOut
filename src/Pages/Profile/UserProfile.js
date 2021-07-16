import React from "react"
import { useSelector } from "react-redux"

import UserProfilePage from "../../../Components/UserProfilePage"
export default function UserProfile({ navigation }) {
  const currSub = useSelector((state) => state.current.profile_profile)
  const goToFriends = () => {
    navigation.navigate("User Friends")
  }
  return (
    <UserProfilePage
      goToFriends={goToFriends}
      sub={currSub}
      showFriends={true}
    />
  )
}

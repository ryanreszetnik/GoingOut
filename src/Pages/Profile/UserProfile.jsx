import React from "react"
import { useSelector } from "react-redux"

import UserProfilePage from "../../CommonPages/UserProfilePage"
import { PROFILE_FRIENDS } from "../../Constants/screens"
export default function UserProfile({ navigation, route }) {
  const { sub } = route.params
  const goToFriends = () => {
    navigation.push(PROFILE_FRIENDS, { sub: sub })
  }
  return (
    <UserProfilePage goToFriends={goToFriends} sub={sub} showFriends={true} />
  )
}

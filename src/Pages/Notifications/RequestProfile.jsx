import React, { Fragment } from "react"
import UserProfilePage from "../../CommonPages/UserProfilePage"
export default function RequestProfile({ navigation, route }) {
  const { sub } = route.params
  return (
    <UserProfilePage goToFriends={() => {}} showFriends={false} sub={sub} />
  )
}

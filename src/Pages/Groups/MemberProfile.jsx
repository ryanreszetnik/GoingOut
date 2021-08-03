import React from "react"
import UserProfilePage from "../../CommonPages/UserProfilePage"
export default function MemberProfile({ navigation, route }) {
  const { sub } = route.params
  return (
    <UserProfilePage goToFriends={() => {}} showFriends={false} sub={sub} />
  )
}

import React from "react"
import { useSelector, useDispatch } from "react-redux"
import UserProfilePage from "../../../Components/UserProfilePage"
export default function RequestProfile({ navigation }) {
  const currentSub = useSelector((state) => state.current.notifications_profile)
  return (
    <UserProfilePage
      goToFriends={() => {}}
      showFriends={false}
      sub={currentSub}
    />
  )
}

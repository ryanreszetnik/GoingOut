import React from "react"
import { useSelector } from "react-redux"
import UserFriendsList from "../../CommonPages/UserFriendsList"
import { PROFILE_PROFILE, PROFILE_VIEW } from "../../Constants/screens"

export default function Friends({ navigation, route }) {
  const { sub } = route.params
  const userSub = useSelector((state) => state.profile.sub)

  const selectUser = (profile) => {
    if (profile === userSub) {
      navigation.navigate(PROFILE_VIEW)
    } else {
      navigation.push(PROFILE_PROFILE, { sub: profile })
    }
  }

  return <UserFriendsList sub={sub} selectUser={selectUser} />
}

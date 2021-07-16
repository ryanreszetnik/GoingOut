import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_CUR_PROFILE } from "../../Actions/friendActions"
import UserFriendsList from "../../../Components/UserFriendsList"
import { PROFILE_PAGE } from "../../Constants/pageConstants"

export default function UserFriends({ navigation }) {
  const dispatch = useDispatch()

  const sub = useSelector((state) => state.current.profile_profile)

  const selectUser = (profile) => {
    dispatch({ type: SET_CUR_PROFILE, payload: profile, page: PROFILE_PAGE })
    navigation.navigate("User Profile")
  }

  return <UserFriendsList sub={sub} selectUser={selectUser} />
}

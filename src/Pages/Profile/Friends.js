import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { ScrollView } from "react-native-gesture-handler"
import AppTextInput from "../../../Components/AppTextInput"
import UserList from "../../../Components/UserList"
import { SET_CUR_PROFILE, SET_FRIENDS } from "../../Actions/friendActions"
import { getFriends } from "../../Endpoints/friendsEndpoints"
import { getImageURIBySub } from "../../aws-exports"
import { getUser } from "../../Endpoints/profileEndpoints"
import { ensureProfilesLoaded } from "../../Utils/profiles.utils"
import UserFriendsList from "../../../Components/UserFriendsList"
import { PROFILE_PAGE } from "../../Constants/pageConstants"

export default function Friends({ navigation }) {
  const dispatch = useDispatch()

  const sub = useSelector((state) => state.profile.sub)

  const selectUser = (profile) => {
    dispatch({ type: SET_CUR_PROFILE, payload: profile, page: PROFILE_PAGE })
    navigation.navigate("User Profile")
  }

  return <UserFriendsList sub={sub} selectUser={selectUser} />
}

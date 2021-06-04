import React, { useEffect } from "react"
import { View, Text } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { ScrollView } from "react-native-gesture-handler"
import AppButton from "../../../Components/AppButton"
import UserList from "../../../Components/UserList"
import { SET_CUR_PROFILE, SET_FRIENDS } from "../../Actions/friendActions"
import { getFriends } from "../../Endpoints/friendsEndpoints"

export default function Friends({ navigation }) {
  const dispatch = useDispatch()
  const sub = useSelector((state) => state.userSession.userData.attributes.sub)
  const friendList = useSelector((state) => state.friends.friends)

  useEffect(() => {
    if (friendList.length === 0) {
      updateList()
    }
  }, [])
  const updateList = async () => {
    dispatch({ type: SET_FRIENDS, payload: await getFriends(sub) })
  }

  const selectUser = (profile) => {
    dispatch({ type: SET_CUR_PROFILE, payload: profile })
    navigation.navigate("User Profile")
  }

  return (
    <ScrollView>
      <AppButton onPress={() => navigation.navigate("Search Friends")} />
      <UserList onPress={selectUser} users={friendList} />
    </ScrollView>
  )
}

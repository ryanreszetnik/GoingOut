import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import UserList from "../../../Components/UserList"
import { useDispatch, useSelector } from "react-redux"
import { getFriends } from "../../Endpoints/friendsEndpoints"
import { SET_CUR_PROFILE } from "../../Actions/friendActions"

export default function UserFriends({ navigation }) {
  const [friends, setFriends] = useState([])
  const sub = useSelector((state) => state.friends.curProfile.sub)
  const dispatch = useDispatch()
  useEffect(() => {
    makeFriends()
  }, [])

  const makeFriends = async () => {
    setFriends(await getFriends(sub))
  }

  const selectUser = (profile) => {
    dispatch({ type: SET_CUR_PROFILE, payload: profile })
    navigation.navigate("User Profile")
  }

  return (
    <ScrollView>
      <UserList users={friends} onPress={selectUser} />
    </ScrollView>
  )
}

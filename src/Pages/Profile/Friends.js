import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { ScrollView } from "react-native-gesture-handler"
import AppTextInput from "../../../Components/AppTextInput"
import UserList from "../../../Components/UserList"
import { SET_CUR_PROFILE, SET_FRIENDS } from "../../Actions/friendActions"
import { getFriends } from "../../Endpoints/friendsEndpoints"

export default function Friends({ navigation }) {
  const dispatch = useDispatch()
  const sub = useSelector((state) => state.userSession.userData.attributes.sub)
  const [searchTerm, setSearch] = useState("")
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

  const updateSearch = (text) => {
    setSearch(text)
  }

  return (
    <ScrollView>
      <AppTextInput
        value={searchTerm}
        onChangeText={(text) => updateSearch(text)}
        leftIcon='magnify'
        placeholder='Search For Friends by Name'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
      />
      <UserList
        onPress={selectUser}
        users={friendList.filter((friend) =>
          friend.name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
      />
    </ScrollView>
  )
}

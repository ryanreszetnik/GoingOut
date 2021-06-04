import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import FriendSearch from "./FriendSearch"
import { Friend } from "../../Types/common.types"
import { useSelector, useDispatch } from "react-redux"
import { ScrollView } from "react-native-gesture-handler"
import { SET_CUR_PROFILE } from "../../Actions/friendActions"
import UserList from "../../../Components/UserList"
import { getFriends } from "../../Endpoints/friendsEndpoints"

export default function Friends({ navigation }) {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.friends.curProfile)
  const [users, setUsers]=useState([]);
  const onSelect = (profile) => {
    dispatch({ type: SET_CUR_PROFILE, payload: profile })
    navigation.navigate("User Profile")
  }
  useEffect(()=>{
    getUsers();
  },[])
  const getUsers=async()=>{
    setUsers(await getFriends(profile.sub))
  }
  const selectUser=(user)=>{

  }
  return (
    <ScrollView>
      <UserList users={users} onPress={selectUser}/>
    </ScrollView>
  )
}

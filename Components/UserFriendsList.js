import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import UserList from "./UserList"
import { useDispatch, useSelector } from "react-redux"
import { getFriends } from "../src/Endpoints/friendsEndpoints"
import AppTextInput from "./AppTextInput"

export default function UserFriendsList({ selectUser, sub }) {
  const isSignedInSub = useSelector((state) => state.profile.sub) === sub
  const signedInFriends = useSelector((state) => state.friends)
  const [friends, setFriends] = useState([])
  const [searchTerm, updateSearch] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    if (!isSignedInSub && sub) {
      makeFriends()
    }
  }, [sub])
  useEffect(() => {
    if (isSignedInSub && sub) {
      makeFriends()
    }
  }, [signedInFriends, sub])

  const makeFriends = async () => {
    if (isSignedInSub) {
      setFriends(signedInFriends.map((f) => f.sub))
    } else {
      const f = (await getFriends(sub)).filter(
        (fr) => fr.status === "CONFIRMED"
      )
      setFriends(f.map((fr) => fr.sub))
    }
  }

  return (
    <ScrollView>
      <AppTextInput
        value={searchTerm}
        onChangeText={(text) => updateSearch(text)}
        leftIcon="magnify"
        placeholder="Search For Friends by Name"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <UserList
        onPress={selectUser}
        subs={friends}
        showFriendships={false}
        filterTerm={searchTerm}
      />
    </ScrollView>
  )
}

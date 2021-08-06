import React, { useEffect, useState } from "react"
import { View, Text, Animated } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import UserList from "../Components/UserList"
import { useDispatch, useSelector } from "react-redux"
import { getFriends } from "../Endpoints/friendsEndpoints"
import AppTextInput from "../Components/AppTextInput"
import { PAGE_BACKGROUND_COLOR } from "../Theme/theme.style"

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
    return () => {
      setFriends([])
    }
  }, [sub])
  useEffect(() => {
    if (isSignedInSub && sub) {
      makeFriends()
    }
    return () => {
      setFriends([])
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
    <ScrollView style={{ backgroundColor: PAGE_BACKGROUND_COLOR }}>
      <View style={{ width: "95%", alignSelf: "center" }}>
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
          showFriendships={true}
          filterTerm={searchTerm}
        />
      </View>
    </ScrollView>
  )
}

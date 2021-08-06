import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import AppTextInput from "../Components/AppTextInput"
import UserList from "../Components/UserList"
import { searchUser } from "../Endpoints/friendsEndpoints"
import { PAGE_BACKGROUND_COLOR } from "../Theme/theme.style"

export default function SelectMembers({ members, addMember, removeMember }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [friends, setFriends] = useState([])
  const curSub = useSelector((state) => state.profile.sub)
  const tryRemoveMember = (sub) => {
    if (sub !== curSub) {
      removeMember(sub)
    }
  }
  useEffect(() => {
    updateSearch("")
  }, [])
  const updateSearch = async (term) => {
    setSearchTerm(term)
    setFriends(await searchUser(term))
  }
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: PAGE_BACKGROUND_COLOR,
      }}
    >
      <View style={{ height: 120 }}>
        <UserList
          subs={members}
          onPress={tryRemoveMember}
          horizontal={true}
          removeIcon
        />
      </View>
      <AppTextInput
        value={searchTerm}
        onChangeText={(text) => updateSearch(text)}
        leftIcon="magnify"
        placeholder="Search For Users"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <UserList
        onPress={addMember}
        subs={friends.filter((f) => !members.some((m) => m === f))}
      />
    </View>
  )
}

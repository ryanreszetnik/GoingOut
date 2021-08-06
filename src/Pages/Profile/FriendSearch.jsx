import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import { useSelector } from "react-redux"
import { searchUser } from "../../Endpoints/friendsEndpoints"
import AppTextInput from "../../Components/AppTextInput"
import UserList from "../../Components/UserList"
import { PROFILE_PROFILE } from "../../Constants/screens"
import { PAGE_BACKGROUND_COLOR, PRIMARY_FONT } from "../../Theme/theme.style"

export default function FriendSearch({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("")
  const friends = useSelector((state) => state.friends)
  const [filtered, setFiltered] = useState([])
  const [foundUsers, setFoundUsers] = useState([])
  const sub = useSelector((state) => state.profile.sub)

  useEffect(() => {
    setFiltered(
      foundUsers.filter(
        (fr) => !friends.some((f) => f.sub === fr) && fr !== sub
      )
    )
  }, [friends, foundUsers])
  useEffect(() => {
    updateSearch("")
  }, [])
  const updateSearch = async (term) => {
    setSearchTerm(term)

    const newFriends = await searchUser(term)
    setFoundUsers(newFriends)
  }

  const onSelect = (profile) => {
    navigation.navigate(PROFILE_PROFILE, { sub: profile })
  }

  return (
    <View style={{ backgroundColor: PAGE_BACKGROUND_COLOR, height: "100%" }}>
      <Text style={styles.title}>Add friends by username</Text>
      <View style={styles.mainBackground}>
        <AppTextInput
          value={searchTerm}
          onChangeText={(text) => updateSearch(text)}
          leftIcon="magnify"
          placeholder="Search For Users"
          autoCapitalize="none"
        />
      </View>

      {searchTerm.length > 0 && (
        <UserList onPress={onSelect} subs={filtered} showFriendships={true} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 15,
    textAlign: "center",
    color: "white",
    fontFamily: PRIMARY_FONT,
  },
  mainBackground: {
    backgroundColor: PAGE_BACKGROUND_COLOR,
    width: "99%",
    alignSelf: "center",
  },
  friendBackground: {
    borderWidth: 0.5,
    borderColor: "lightgray",
    backgroundColor: PAGE_BACKGROUND_COLOR,
  },
  friendText: {
    color: "black",
    fontSize: 15,
    padding: 5,
  },
})

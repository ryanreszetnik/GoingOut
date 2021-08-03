import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import { useSelector } from "react-redux"
import { searchUser } from "../../Endpoints/friendsEndpoints"
import AppTextInput from "../../Components/AppTextInput"
import UserList from "../../Components/UserList"
import { PROFILE_PAGE } from "../../Constants/screens"

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
    console.log(newFriends)
    setFoundUsers(newFriends)
  }

  const onSelect = (profile) => {
    navigation.navigate(PROFILE_PAGE, { sub: profile })
  }

  return (
    <View>
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
      <UserList onPress={onSelect} subs={filtered} showFriendships={true} />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 15,
    textAlign: "center",
  },
  mainBackground: {
    backgroundColor: "white",
    width: "99%",
    alignSelf: "center",
  },
  friendBackground: {
    borderWidth: 0.5,
    borderColor: "lightgray",
    backgroundColor: "white",
  },
  friendText: {
    color: "black",
    fontSize: 15,
    padding: 5,
  },
})

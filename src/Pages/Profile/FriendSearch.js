import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useDispatch } from "react-redux"
import { searchUser } from "../../Endpoints/friendsEndpoints"
import AppTextInput from "../../../Components/AppTextInput"
import UserList from "../../../Components/UserList"
import { SET_CUR_PROFILE } from "../../Actions/friendActions"

export default function FriendSearch({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [friends, setFriends] = useState([])

  const updateSearch = async (term) => {
    setSearchTerm(term)
    if (term.length > 0) {
      const newFriends = await searchUser(term)
      console.log(newFriends)
      setFriends(newFriends)
    } else {
      setFriends([])
    }
  }
  const dispatch = useDispatch()

  const onSelect = (profile) => {
    dispatch({ type: SET_CUR_PROFILE, payload: profile })
    navigation.navigate("User Profile")
  }

  return (
    <View>
      <Text style={styles.title}>Add friends by username</Text>
      <View style={styles.mainBackground}>
        <AppTextInput
          value={searchTerm}
          onChangeText={(text) => updateSearch(text)}
          leftIcon='magnify'
          placeholder='Search For Users'
          autoCapitalize='none'
        />
      </View>
      <UserList users={friends} onPress={onSelect} />
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

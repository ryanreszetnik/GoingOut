import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { searchUser } from "../src/Endpoints/friendsEndpoints"
import AppTextInput from "./AppTextInput"

export default function FriendSearch({ onSelect }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [friends, setFriends] = useState([])
  useEffect(() => {
    updateSearch("")
  }, [])

  const updateSearch = async (term) => {
    setSearchTerm(term)
    const newFriends = await searchUser(term)
    setFriends((friends) => (newFriends ? newFriends.Items : []))
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
          keyboardType='email-address'
          textContentType='emailAddress'
        />
      </View>
      {friends.map((friend) => {
        if (searchTerm.length > 0) {
          return (
            <TouchableOpacity
              key={friend.sub}
              style={styles.friendBackground}
              onPress={() => onSelect(friend)}
            >
              <Text
                style={styles.friendText}
              >{`Username: ${friend.username}`}</Text>
              <Text style={styles.friendText}>{`Name: ${friend.name}`}</Text>
            </TouchableOpacity>
          )
        }
      })}
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

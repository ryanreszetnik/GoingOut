import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import AppTextInput from "../../../../Components/AppTextInput"
import UserList from "../../../../Components/UserList"
import { useSelector, useDispatch } from "react-redux"
import { searchUser } from "../../../Endpoints/friendsEndpoints"
import { ScrollView } from "react-native-gesture-handler"
import AppButton from "../../../../Components/AppButton"
import { addTempGroupMembers } from "../../../Socket/SocketMethods"
import { ADD_TEMP_GROUP_MEMBERS } from "../../../Socket/socket.constants"

export default function AddMembers({ navigation }) {
  const dispatch = useDispatch()
  const curId = useSelector((state) => state.current.tempGroup)
  const group = useSelector((state) => state.tempGroups).find(
    (group) => group.groupId === curId
  )

  const [newMembers, setNewMembers] = useState([])
  const curMembers = group.members
  const [searchTerm, setSearchTerm] = useState("")
  const [friends, setFriends] = useState([])
  const updateSearch = async (term) => {
    setSearchTerm(term)
    if (term.length > 0) {
      const newFriends = await searchUser(term)
      setFriends(newFriends.filter((fr) => !group.members.includes(fr)))
    } else {
      setFriends([])
    }
  }

  const removeMember = (user) => {
    setNewMembers((mem) => mem.filter((m) => m !== user))
  }
  const addMember = (user) => {
    setNewMembers((mem) => [...mem, user])
  }

  const saveChanges = async () => {
    await addTempGroupMembers(curId, newMembers)
    navigation.navigate("Members")
  }

  return (
    <ScrollView>
      <Text style={styles.searchTitle}>Add members to group</Text>
      <UserList subs={newMembers} onPress={removeMember} priority={1} />
      <AppTextInput
        value={searchTerm}
        onChangeText={(text) => updateSearch(text)}
        leftIcon="magnify"
        placeholder="Search For Users"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <View style={styles.searchArea}>
        <UserList
          onPress={addMember}
          subs={friends.filter((user) => !newMembers.includes(user))}
        />
      </View>
      <View style={styles.buttonArea}>
        <AppButton title="Save Changes" onPress={saveChanges} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  searchTitle: {
    fontSize: 20,
    padding: 10,
    alignSelf: "center",
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "black",
    width: "90%",
  },
  searchArea: {
    marginTop: 10,
    backgroundColor: "white",
  },
  buttonArea: {
    alignItems: "center",
    borderTopColor: "black",
    borderTopWidth: 1,
    marginTop: 30,
    padding: 10,
    width: "90%",
    alignSelf: "center",
  },
})

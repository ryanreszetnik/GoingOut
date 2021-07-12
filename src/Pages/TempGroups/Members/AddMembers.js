import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import AppTextInput from "../../../../Components/AppTextInput"
import UserList from "../../../../Components/UserList"
import { useSelector, useDispatch } from "react-redux"
import { searchUser } from "../../../Endpoints/friendsEndpoints"
import { ScrollView } from "react-native-gesture-handler"
import AppButton from "../../../../Components/AppButton"


export default function AddMembers({ navigation }) {
  const dispatch = useDispatch()
  const curId = useSelector((state) => state.current.tempGroup)
  const group = useSelector((state) => state.tempGroups).find(
    (group) => group.groupId === curId
  )

  const [members, setMembers] = useState(group.members)
  const curMembers = group.members
  const [searchTerm, setSearchTerm] = useState("")
  const [friends, setFriends] = useState([])
  const updateSearch = async (term) => {
    setSearchTerm(term)
    if (term.length > 0) {
      const newFriends = await searchUser(term)
      setFriends(newFriends)
    } else {
      setFriends([])
    }
  }

  const removeMember = (user) => {
    !curMembers.map((member) => member.sub).includes(user.sub) &&
      setMembers(members.filter((member) => member.sub !== user.sub))
  }

  const onPress = (user) => {
    setMembers([...members, user])
  }
  const saveChanges = async () => {
  //dispatch({ type: ADD_PERM_MEMBERS, payload: members })
   // console.log(await addMembers(members, curId))
    navigation.navigate("Members")
  }

  return (
    <ScrollView>
      <Text style={styles.searchTitle}>Add members to event</Text>
      <UserList users={members} onPress={removeMember} />
      <AppTextInput
        value={searchTerm}
        onChangeText={(text) => updateSearch(text)}
        leftIcon='magnify'
        placeholder='Search For Users'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
      />
      <View style={styles.searchArea}>
        <UserList
          onPress={onPress}
          users={friends.filter(
            (user) => !members.map((member) => member.sub).includes(user.sub)
          )}
        />
      </View>
      <View style={styles.buttonArea}>
        <AppButton title='Save Changes' onPress={saveChanges} />
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

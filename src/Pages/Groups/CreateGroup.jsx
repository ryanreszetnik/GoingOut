import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { ScrollView } from "react-native-gesture-handler"
import AppTextInput from "../../Components/AppTextInput"
import AgeRange from "../../Components/AgeRange"
import GenderPicker from "../../Components/GenderPreference"
import UserList from "../../Components/UserList"
import { searchUser } from "../../Endpoints/friendsEndpoints"
import AppButton from "../../Components/AppButton"
import uuid from "react-native-uuid"
import { createGroup } from "../../Socket/socketMethods"
import { GROUPS_VIEW } from "../../Constants/screens"

export default function CreateGroup({ navigation }) {
  const [locRange, setLocRange] = useState(25)
  const [groupName, setGroupName] = useState()
  const [groupBio, setGroupBio] = useState()
  const [ageRange, setAgeRange] = useState({ minAge: 18, maxAge: 100 })
  const [genderPref, setPref] = useState("")
  const curUser = useSelector((state) => state.profile)
  const [members, setMembers] = useState([curUser.sub])
  const [searchTerm, setSearchTerm] = useState("")
  const [friends, setFriends] = useState([])

  const createNewGroup = async () => {
    const newGroup = {
      name: groupName,
      members: members,
      bio: groupBio,
      locRange: locRange,
      ageRange: ageRange,
      genderPref: genderPref,
      groupId: uuid.v4(),
    }
    console.log("Creating group")
    createGroup(newGroup)
    console.log("Done Creating group")
    navigation.navigate(GROUPS_VIEW)
  }
  useEffect(() => {
    updateSearch("")
  }, [])
  const updateSearch = async (term) => {
    setSearchTerm(term)

    const newFriends = await searchUser(term)
    setFriends(newFriends)
  }

  const removeMember = (user) => {
    user !== curUser.sub &&
      setMembers(members.filter((member) => user !== member))
  }
  const onPress = (user) => {
    setMembers([...members, user])
  }

  return (
    <ScrollView>
      <AppTextInput
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
        leftIcon="form-textbox"
        placeholder="Enter Group Name"
        autoCapitalize="none"
      />
      <AppTextInput
        value={groupBio}
        onChangeText={(text) => setGroupBio(text)}
        leftIcon="card-text"
        placeholder="Enter a short Bio"
        autoCapitalize="none"
      />
      <Text style={styles.sliderTitle}>Enter Preferred Age Range</Text>
      <AgeRange ageRange={ageRange} setAgeRange={setAgeRange} />
      <GenderPicker checked={genderPref} setChecked={setPref} />
      <Text style={styles.searchTitle}>Add members to group</Text>
      <UserList subs={members} onPress={removeMember} horizontal={true} />
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
        onPress={onPress}
        subs={friends.filter((f) => !members.some((m) => m === f))}
      />
      <View style={styles.searchArea}>
        <View style={{ alignItems: "center" }}>
          <AppButton title="Create Group" onPress={createNewGroup} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  sliderTitle: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "black",
    width: "90%",
  },
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
    height: 450,
  },
})

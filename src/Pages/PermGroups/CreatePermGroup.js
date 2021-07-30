import React, { useEffect, useState } from "react"
import { View, Text, Button, TextInput, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useSelector, batch } from "react-redux"
import moment from "moment"
import MultiSlider from "@ptomasroos/react-native-multi-slider"
import { ScrollView } from "react-native-gesture-handler"
import AppTextInput from "../../../Components/AppTextInput"
import Slider from "../../../Components/Slider"
import GenderPicker from "../../../Components/GenderPicker"
import UserList from "../../../Components/UserList"
import { searchUser } from "../../Endpoints/friendsEndpoints"
import AppButton from "../../../Components/AppButton"
import { ADD_FRIEND } from "../../Actions/friendActions"
import { ADD_PERM_GROUP } from "../../Actions/groupActions"
import uuid from "react-native-uuid"
import { SET_USER_GROUPS } from "../../Actions/authActions"
import { createPermGroup } from "../../Socket/SocketMethods"

export default function CreatePermGroup({ navigation }) {
  const [locRange, setLocRange] = useState(25)
  const [groupName, setGroupName] = useState()
  const [groupBio, setGroupBio] = useState()
  const [ageRange, setAgeRange] = useState([18, 100])
  const [loc, setLoc] = useState({ lat: 27.1234, lon: -27.342 })
  const [genderPref, setPref] = useState("")
  const curUser = useSelector((state) => state.profile)
  const [members, setMembers] = useState([curUser.sub])
  const [searchTerm, setSearchTerm] = useState("")
  const [friends, setFriends] = useState([])

  const createGroup = async () => {
    const newGroup = {
      name: groupName,
      members: members,
      bio: groupBio,
      loc: loc,
      locRange: locRange,
      ageRange: { minAge: ageRange[0], maxAge: ageRange[1] },
      genderPref: genderPref,
      groupId: uuid.v4(),
    }
    createPermGroup(newGroup)
    navigation.navigate("View Perm Groups")
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
      <Slider multiSliderValue={ageRange} setMultiSliderValue={setAgeRange} />
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
          <AppButton title="Create Group" onPress={createGroup} />
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

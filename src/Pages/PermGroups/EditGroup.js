import React, { useState } from "react"
import { View, Text, Button, TextInput, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector, batch } from "react-redux"
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
import { addPermGroup } from "../../Endpoints/permGroupsEndpoints"
import uuid from "react-native-uuid"
import { SET_USER_GROUPS } from "../../Actions/authActions"

export default function EditGroup({ navigation }) {
  const group = useSelector((state) => state.groups.permGroups).find(
    (group) => group.groupId === useSelector((state) => state.groups.curGroup)
  )
  const dispatch = useDispatch()
  const [locRange, setLocRange] = useState(group.locRange)
  const [groupName, setGroupName] = useState(group.name)
  const [groupBio, setGroupBio] = useState(group.bio)
  const [ageRange, setAgeRange] = useState([group.minAge, group.maxAge])
  const [loc, setLoc] = useState(group.loc)
  const [genderPref, setPref] = useState(group.genderPref)
  const curUserGet = useSelector(
    (state) => state.userSession.userData.attributes
  )
  const curUser = {
    name: curUserGet.name,
    sub: curUserGet.sub,
    birthdate: curUserGet.birthdate,
    gender: curUserGet.gender,
    username: useSelector((state) => state.userSession.user.username),
  }

  const [members, setMembers] = useState(group.members)
  const [searchTerm, setSearchTerm] = useState("")
  const [friends, setFriends] = useState([])

  const editGroup = async () => {
    const newGroup = {
      groupId: group.groupId,
      name: groupName,
      members: members,
      bio: groupBio,
      loc: loc,
      locRange: locRange,
      minAge: ageRange[0],
      maxAge: ageRange[1],
      genderPref: genderPref,
      permanent: true,
      datetime: "",
    }
    navigation.navigate("View Single Group")
  }

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
    user.sub !== curUser.sub &&
      setMembers(members.filter((member) => user.sub !== member.sub))
  }
  const onPress = (user) => {
    setMembers([...members, user])
  }
  return (
    <ScrollView>
      <AppTextInput
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
        leftIcon='form-textbox'
        placeholder='Enter Group Name'
        autoCapitalize='none'
      />
      <AppTextInput
        value={groupBio}
        onChangeText={(text) => setGroupBio(text)}
        leftIcon='card-text'
        placeholder='Enter a short Bio'
        autoCapitalize='none'
      />
      <Text style={styles.sliderTitle}>Enter Preferred Age Range</Text>
      <Slider multiSliderValue={ageRange} setMultiSliderValue={setAgeRange} />
      <GenderPicker checked={genderPref} setChecked={setPref} />
      <Text style={styles.searchTitle}>Add members to group</Text>
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
        <View style={{ alignItems: "center" }}>
          <AppButton title='Save Changes' onPress={editGroup} />
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

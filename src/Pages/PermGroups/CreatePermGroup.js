import React, { useState } from "react"
import { View, Text, Button, TextInput, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
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

export default function CreatePermGroup({ navigation, group }) {
  const dispatch = useDispatch()
  const [locRange, setLocRange] = useState(25)
  const [groupName, setGroupName] = useState()
  const [groupBio, setGroupBio] = useState()
  const [ageRange, setAgeRange] = useState([0, 100])
  const [loc, setLoc] = useState("somewhere")
  const [genderPref, setPref] = useState("")
  const [members, setMembers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [friends, setFriends] = useState([])

  const createGroup = async () => {
    const newGroup = {
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
      groupId: uuid.v4(),
    }
    try {
      const lmao = await addPermGroup(newGroup)
      console.log(lmao)

      // dispatch({
      //   type: ADD_PERM_GROUP,
      //   payload: lmao,
      // })
    } catch (error) {
      console.log(error)
    }
    navigation.navigate("View Perm Groups")
  }
  const updateSearch = async (term) => {
    setSearchTerm(term)
    if (term.length > 0) {
      const newFriends = await searchUser(term)
      setFriends(newFriends.filter((user) => !members.includes(user)))
    } else {
      setFriends([])
    }
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
        <UserList onPress={onPress} users={friends} />
        <View style={{ alignItems: "center" }}>
          <AppButton title='Create Group' onPress={createGroup} />
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

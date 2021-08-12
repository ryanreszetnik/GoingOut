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
import { GROUPS_VIEW, GROUPS_EDIT_MEMBERS } from "../../Constants/screens"
import { PAGE_BACKGROUND_COLOR } from "../../Theme/theme.style"

export default function CreateGroup({ navigation }) {
  const [locRange, setLocRange] = useState(50)
  const [groupName, setGroupName] = useState()
  const [groupBio, setGroupBio] = useState()
  const [ageRange, setAgeRange] = useState({ minAge: 18, maxAge: 100 })
  const [genderPref, setPref] = useState("None")
  const curUser = useSelector((state) => state.profile)
  const [members, setMembers] = useState([curUser.sub])

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
  const removeMember = (user) => {
    user !== curUser.sub &&
      setMembers(members.filter((member) => user !== member))
  }

  return (
    <ScrollView style={styles.page}>
      <AppTextInput
        label="Group Name"
        required
        value={groupName}
        onChangeText={(text) => setGroupName(text)}
        placeholder="Enter Group Name"
        autoCapitalize="none"
      />

      <View style={{ paddingBottom: 10 }}>
        <Text style={styles.title}>Members</Text>
        <UserList
          subs={members}
          removeIcon
          onPress={(sub) => removeMember(sub)}
          horizontal={true}
          addMember={() =>
            navigation.navigate(GROUPS_EDIT_MEMBERS, {
              initialMembers: members,
              setMembers: setMembers,
            })
          }
        />
      </View>
      <Text style={styles.title}>Preset Event Values</Text>
      <Text style={styles.description}>
        *Set default values for creating events from this group
      </Text>
      <AppTextInput
        label="Event Bio"
        value={groupBio}
        onChangeText={(text) => setGroupBio(text)}
        leftIcon="card-text"
        placeholder="Enter a short public bio"
        autoCapitalize="none"
      />
      <LocationRange locRange={locRange} setLocRange={setLocRange} />
      <AgeRange ageRange={ageRange} setAgeRange={setAgeRange} />
      <GenderPicker setChecked={setPref} checked={genderPref} />
      <View style={{ alignItems: "center" }}>
        <AppButton title="Create Group" onPress={createNewGroup} />
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
  page: {
    backgroundColor: PAGE_BACKGROUND_COLOR,
    paddingTop: 10,
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
  },
  description: {
    color: "white",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
})

import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { ScrollView } from "react-native-gesture-handler"
import AppTextInput from "../../Components/AppTextInput"
import AgeRange from "../../Components/AgeRange"
import GenderPicker from "../../Components/GenderPreference"
import AppButton from "../../Components/AppButton"

import { editGroup } from "../../Socket/socketMethods"
import { GROUPS_SINGLE_GROUP } from "../../Constants/screens"
import { PAGE_BACKGROUND_COLOR } from "../../Theme/theme.style"
import UserList from "../../Components/UserList"

export default function EditGroup({ navigation, route }) {
  const { groupId } = route.params
  const group = useSelector((state) =>
    state.groups.find((group) => group.groupId === groupId)
  )
  console.log(typeof group.locRange)
  const [locRange, setLocRange] = useState(
    typeof group.locRange === "string"
      ? parseInt(group.locRange)
      : group.locRange
  )
  const [groupName, setGroupName] = useState(group.name)
  const [groupBio, setGroupBio] = useState(group.bio)
  const [ageRange, setAgeRange] = useState(group.ageRange)
  const [genderPref, setPref] = useState(
    group.genderPref.length > 0 ? group.genderPref : "None"
  )

  const editGroup = async () => {
    const newGroup = {
      groupId: group.groupId,
      ...(groupName !== group.name ? { name: groupName } : {}),
      ...(groupBio !== group.bio ? { bio: groupBio } : {}),
      ...(locRange !== group.locRange ? { locRange } : {}),
      ...(ageRange.minAge !== group.ageRange.minAge ||
      ageRange.maxAge !== group.ageRange.maxAge
        ? { ageRange: ageRange }
        : {}),
      ...(genderPref !== group.genderPref ? { genderPref } : {}),
    }
    editGroup(newGroup)
    navigation.navigate(GROUPS_SINGLE_GROUP, { groupId: groupId })
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
        <AppButton title="Save Group" onPress={editGroup} />
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

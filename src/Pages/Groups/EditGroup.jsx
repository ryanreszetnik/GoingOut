import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { ScrollView } from "react-native-gesture-handler"
import AppTextInput from "../../Components/AppTextInput"
import AgeRange from "../../Components/AgeRange"
import GenderPicker from "../../Components/GenderPicker"
import AppButton from "../../Components/AppButton"

import { editGroup } from "../../Socket/socketMethods"
import { GROUPS_SINGLE_GROUP } from "../../Constants/screens"

export default function EditGroup({ navigation, route }) {
  const { groupId } = route.params
  const group = useSelector((state) =>
    state.groups.find((group) => group.groupId === groupId)
  )
  const [locRange, setLocRange] = useState(group.locRange)
  const [groupName, setGroupName] = useState(group.name)
  const [groupBio, setGroupBio] = useState(group.bio)
  const [ageRange, setAgeRange] = useState(group.ageRange)
  const [genderPref, setPref] = useState(group.genderPref)

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
      <AgeRange ageRange={ageRange} setAgeRange={setAgeRange} />
      <GenderPicker checked={genderPref} setChecked={setPref} />
      <View style={{ alignItems: "center" }}>
        <AppButton title='Save Changes' onPress={editGroup} />
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
})

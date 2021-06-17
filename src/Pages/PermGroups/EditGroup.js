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
import {
  ADD_PERM_GROUP,
  EDIT_PERM_GROUP,
  SET_DATE,
  SET_USER_MATCHES,
} from "../../Actions/groupActions"
import { addPermGroup } from "../../Endpoints/permGroupsEndpoints"
import uuid from "react-native-uuid"
import { SET_USER_GROUPS } from "../../Actions/authActions"
import { updateGroup } from "../../Endpoints/permGroupsEndpoints"
import MonthPicker from "../../../Components/MonthPicker"
import DatesList from "../../../Components/DatesList"
import { Checkbox } from "react-native-paper"

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
  const [dates, setDates] = useState([])
  const [checked, setChecked] = useState("unchecked")

  const addDate = (date) => {
    if (!dates.includes(date)) {
      setDates([...dates, date])
    }
  }
  const onDelete = (date) => {
    setDates(dates.filter((day) => day !== date))
  }
  const onEdit = (date) => {
    if (checked === "unchecked") {
      dispatch({ type: SET_DATE, payload: date })
    }
  }
  const editGroup = async () => {
    const newGroup = {
      groupId: group.groupId,
      name: groupName,
      bio: groupBio,
      loc,
      locRange: locRange,
      ageRange: { min: ageRange[0], max: ageRange[1] },
      genderPref,
      dates,
      members: group.members,
    }
    dispatch({ type: EDIT_PERM_GROUP, payload: newGroup })

    console.log(await updateGroup(newGroup))
    //need another api call to put userMatches
    navigation.navigate("View Single Group")
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
      <MonthPicker updateDate={addDate} />
      <DatesList dates={dates} onDelete={onDelete} onPress={onEdit} />
      <Checkbox.Item
        label='Keep default preferences for all selected dates'
        position='leading'
        status={checked}
        onPress={() =>
          checked === "checked"
            ? setChecked("unchecked")
            : setChecked("checked")
        }
        uncheckedColor='tomato'
        color='tomato'
        style={{
          borderWidth: 0.5,
          borderColor: "black",
          width: "95%",
          alignSelf: "center",
        }}
      />
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

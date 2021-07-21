import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AppButton from "../../../Components/AppButton"
import MatchPreview from "./Matches/MatchPreview"
import { SET_CUR_MATCH } from "../../Actions/groupActions"
import { editTempGroup, leaveTempGroup } from "../../Socket/SocketMethods"
import AppTextInput from "../../../Components/AppTextInput"
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"

export default function EditEvent({ navigation }) {
  const curGroup = useSelector((state) => state.current.tempGroup)
  const event = useSelector((state) =>
    state.tempGroups.find((group) => group.groupId === curGroup)
  )
  const [name, setName] = useState(event.name)
  const [bio, setBio] = useState(event.bio)
  const [location, setLocation] = useState(event.location)
  const [time, setTime] = useState(
    new Date(
      new Date().setHours(
        parseInt(event.time.substring(0, event.time.indexOf(":"))) +
          (event.time.toLowerCase().includes("pm") ? 12 : 0),
        parseInt(
          event.time.substring(
            event.time.indexOf(":") + 1,
            event.time.indexOf(" ")
          )
        )
      )
    )
  )
  const [show, setShow] = useState(false)
  const onEdit = () => {
    const newEvent = {
      ...event,
      name,
      bio,
      location,
      time: moment(time).format("LT"),
    }
    editTempGroup(newEvent)
    navigation.navigate("View Single Temp Group")
  }
  return (
    <View>
      <AppTextInput
        value={name}
        onChangeText={(text) => setName(text)}
        leftIcon='form-textbox'
        placeholder='Enter Event Name'
        autoCapitalize='none'
      />
      <AppTextInput
        value={bio}
        onChangeText={(text) => setBio(text)}
        leftIcon='form-textbox'
        placeholder='Enter Event Bio'
        autoCapitalize='none'
      />
      <Text>Current Time: {moment(time).format("LT")}</Text>

      <AppButton
        title='Change Time '
        onPress={() => {
          setShow(true)
        }}
      ></AppButton>
      {show && (
        <DateTimePicker
          value={time}
          mode='time'
          is24Hour={false}
          display='default'
          onChange={(e, newTime) => {
            if (e.type === "dismissed") {
              setShow(false)
            } else {
              setShow(false)
              setTime(newTime)
            }
          }}
        />
      )}
      <AppButton title='Save Changes' onPress={onEdit} />
    </View>
  )
}

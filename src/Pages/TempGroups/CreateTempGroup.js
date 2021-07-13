import React, { useRef, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import AppButton from "../../../Components/AppButton"
import MonthPicker from "../../../Components/MonthPicker"
import { ADD_TEMP_GROUP } from "../../Actions/groupActions"
import GroupPreview from "../../../Components/GroupPreview"
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"
import { showMessage, hideMessage } from "react-native-flash-message"
import FlashMessage from "react-native-flash-message"
import { addTempGroup } from "../../Endpoints/tempGroupsEndpoints"
import uuid from "react-native-uuid"
import AppTextInput from "../../../Components/AppTextInput"

export default function CreateTempGroup({ navigation }) {
  const groups = useSelector((state) => state.permGroups)
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [selectedGroup, setSelectedGroup] = useState()
  const [date, setDate] = useState("")
  const [time, setTime] = useState(new Date())
  const [formattedTime, setFormattedTime] = useState("")
  const [selected, setSelected] = useState(false)
  const selectGroup = (group) => {
    setSelectedGroup(group)
  }
  const scrollRef = useRef()
  const setTimePicker = (event, date) => {
    if (event.type === "dismissed") {
      setSelected(false)
      setTime(new Date())
    } else {
      setSelected(false)
      setTime(date)
      setFormattedTime(moment(date).format("h:mm a"))
    }
  }
  const createEvent = async () => {
    if (formattedTime === "" || date === "" || selectedGroup === undefined) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      })
      const message =
        selectedGroup === undefined
          ? {
              message: "Please select a group",
              type: "danger",
              hideonPress: true,
              animated: true,
              animationDuration: 225,
              autohide: true,
              duration: 2000,
              position: "top",
              icon: "auto",
            }
          : {
              message: "Please select a date and time",
              type: "danger",
              hideonPress: true,
              animated: true,
              animationDuration: 225,
              autohide: true,
              duration: 2000,
              position: "top",
              icon: "auto",
            }
      showMessage(message)
    } else {
      const payload = {
        ...selectedGroup,
        groupId: uuid.v4(),
        members: selectedGroup.members.map((member) => member.sub),
        date,
        time: formattedTime,
        baseGroups: [selectedGroup.groupId],
        isVisible: false,
        name,
        bio,
      }
      dispatch({ type: ADD_TEMP_GROUP, payload })
      await addTempGroup(payload)
      navigation.navigate("View Temp Groups")
    }
  }

  return (
    <ScrollView ref={scrollRef}>
      <Text>Select Group</Text>
      <View>
        {groups.map((group) => {
          return (
            <View
              key={group.groupId}
              style={
                group === selectedGroup
                  ? { borderRightWidth: 20, borderRightColor: "green" }
                  : {}
              }
            >
              <GroupPreview
                group={group}
                key={group.groupId}
                onPress={() => selectGroup(group)}
                id={group.groupId}
              />
            </View>
          )
        })}
      </View>
      <Text>Event Name</Text>
      <AppTextInput
        value={name}
        onChangeText={(text) => setName(text)}
        leftIcon='card-text'
        placeholder='Enter Event Name'
        autoCapitalize='none'
      />
      <Text>Event Bio</Text>
      <AppTextInput
        value={bio}
        onChangeText={(text) => setBio(text)}
        leftIcon='card-text'
        placeholder='Enter a short Bio'
        autoCapitalize='none'
      />
      <Text>Select Date</Text>
      <MonthPicker
        updateDate={(date) => {
          setDate(date)
          setSelected(true)
        }}
      />

      {selected && (
        <DateTimePicker
          value={time}
          mode='time'
          is24Hour={false}
          display='default'
          onChange={setTimePicker}
        />
      )}
      {formattedTime !== "" && <Text>Selected Time: {formattedTime}</Text>}
      <AppButton title='Create Event' onPress={createEvent} />
      <FlashMessage />
    </ScrollView>
  )
}

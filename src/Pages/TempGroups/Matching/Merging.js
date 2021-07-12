import React, { useRef, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import AppButton from "../../../../Components/AppButton"
import MonthPicker from "../../../../Components/MonthPicker"
import { ADD_TEMP_GROUP } from "../../../Actions/groupActions"
import GroupPreview from "../../../../Components/GroupPreview"
//import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"
import { showMessage, hideMessage } from "react-native-flash-message"
import FlashMessage from "react-native-flash-message"
import { addTempGroup } from "../../../Endpoints/tempGroupsEndpoints"
import uuid from "react-native-uuid"
import AppTextInput from "../../../../Components/AppTextInput"
import { sendMergeRequest } from "../../../Socket/SocketMethods"

export default function Merging({ navigation }) {
  const baseGroupId = useSelector((state) => state.current.tempGroup)
  const baseGroup = useSelector((state) => state.tempGroups).find(
    (group) => group.groupId === baseGroupId
  )
  const curMatchId = useSelector((state) => state.current.match)
  const curMatch = useSelector((state) => state.foundMatches).find(
    (group) => group.groupId === curMatchId
  )
  const [time, setTime] = useState("11:23 pm")
  const [bio, setBio] = useState("test")
  const [name, setName] = useState("testd")
  const members = [...baseGroup.members, ...curMatch.members]
  const [ageRange, setAgeRange] = baseGroup.ageRange
  const [loc, setLoc] = useState({ lat: 27, lon: 27 })
  const [locRange, setLocRange] = useState(25)
  const [genderPref, setGenderPref] = useState("Female")
  const date = baseGroup.date
  const baseGroups = [...baseGroup.baseGroups, curMatchId]
  const isVisible = true
  const matchId = useSelector((state) => state.matches).find(
    (match) =>
      match.groupId === baseGroupId && match.otherGroupId === curMatchId
  ).matchId

  const onMerge = () => {
    const group = {
      groupId: uuid.v4(),
      name,
      members,
      bio,
      loc,
      locRange,
      ageRange,
      genderPref,
      date,
      baseGroups,
      time,
      isVisible,
    }
    const match = { matchId }
    sendMergeRequest(group, match)
  }
  return (
    <View>
      <AppButton title='Merge!' onPress={onMerge} />
    </View>
  )
}

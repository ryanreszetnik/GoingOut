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
import { createTempGroup } from "../../Socket/SocketMethods"
import GenderPicker from "../../../Components/GenderPreference"
import UserList from "../../../Components/UserList"
import { searchUser } from "../../Endpoints/friendsEndpoints"
import Slider from "../../../Components/Slider"

export default function CreateTempGroup({ navigation }) {
  const groups = useSelector((state) => state.permGroups)
  const curSub = useSelector((state) => state.profile.sub)
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [genderPref, setGenderPref] = useState("None")
  const [date, setDate] = useState("")
  const [time, setTime] = useState(new Date())
  const [members, setMembers] = useState([curSub])
  const [friends, setFriends] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [ageRange, setAgeRange] = useState([18, 100])
  const [loc, setLoc] = useState({ lat: 27.1234, lon: -27.342 })
  const [locRange, setLocRange] = useState(25)

  const addMember = (sub) => {
    setMembers((mem) => [...mem, sub])
  }
  const removeMember = (sub) => {
    sub !== curSub && setMembers((mem) => mem.filter((m) => m !== sub))
  }
  const updateSearch = async (term) => {
    setSearchTerm(term)
    setFriends(await searchUser(term))
  }

  const scrollRef = useRef()

  const createEvent = async () => {
    console.log(date)
    if (date === "" || (name === "") | (bio === "")) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      })
      const message = {
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
        loc,
        locRange,
        ageRange: { minAge: ageRange[0], maxAge: ageRange[1] },
        genderPref,
        tempGroups: [],
        groupId: uuid.v4(),
        members,
        date,
        time: moment(time).format("LT"),
        baseGroups: [],
        isVisible: false,
        name,
        bio,
      }
      console.log(payload)
      createTempGroup(payload)
      // dispatch({ type: ADD_TEMP_GROUP, payload })
      // await addTempGroup(payload)
      navigation.navigate("View Temp Groups")
    }
  }

  return (
    <ScrollView ref={scrollRef}>
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
        }}
      />
      <Text>Select Time</Text>
      <DateTimePicker
        value={time}
        mode='time'
        is24Hour={false}
        display='default'
        onChange={(e, newTime) => setTime(newTime)}
      />
      <GenderPicker setChecked={setGenderPref} checked={genderPref} />
      <Slider multiSliderValue={ageRange} setMultiSliderValue={setAgeRange} />
      <UserList subs={members} onPress={removeMember} horizontal={true} />
      <AppTextInput
        value={searchTerm}
        onChangeText={(text) => updateSearch(text)}
        leftIcon='magnify'
        placeholder='Search For Users'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
      />
      <UserList
        onPress={addMember}
        subs={friends.filter((f) => !members.some((m) => m === f))}
      />
      <AppButton title='Create Event' onPress={createEvent} />
      <FlashMessage />
    </ScrollView>
  )
}

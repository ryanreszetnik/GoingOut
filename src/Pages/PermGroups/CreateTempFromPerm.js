import React, { useRef, useState } from "react"
import { View, Text, ScrollView, Switch } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import AppButton from "../../../Components/AppButton"
import MonthPicker from "../../../Components/MonthPicker"
import { ADD_TEMP_GROUP } from "../../Actions/groupActions"
//import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"
import { showMessage, hideMessage } from "react-native-flash-message"
import FlashMessage from "react-native-flash-message"
import { addTempGroup } from "../../Endpoints/tempGroupsEndpoints"
import Slider from "../../../Components/Slider"
import uuid from "react-native-uuid"
import AppTextInput from "../../../Components/AppTextInput"
import GenderPreference from "../../../Components/GenderPreference"
import { createTempGroup } from "../../Socket/SocketMethods"

export default function CreateTempFromPerm({ navigation }) {
  const permGroupId = useSelector((state) => state.current.permGroup)
  const baseGroup = useSelector((state) =>
    state.permGroups.find((gr) => gr.groupId === permGroupId)
  )
  const dispatch = useDispatch()
  const [name, setName] = useState(baseGroup ? baseGroup.name : "")
  const [bio, setBio] = useState(baseGroup ? baseGroup.bio : "")
  const [date, setDate] = useState("")
  const [time, setTime] = useState(new Date())
  const [ageRange, setAgeRange] = useState(
    baseGroup
      ? [Math.max(baseGroup.ageRange.minAge, 13), baseGroup.ageRange.maxAge]
      : [(0, 100)]
  )
  const [genderPref, setGenderPref] = useState(
    (baseGroup && baseGroup.genderPref == "Male") ||
      baseGroup.genderPref == "Female"
      ? baseGroup.genderPref
      : "None"
  )
  const [formattedTime, setFormattedTime] = useState("7:00 pm")
  const [selected, setSelected] = useState(false)
  const [useDefault, setUseDefault] = useState(true)

  const changeSwitch = () => {
    setUseDefault((s) => !s)
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
    if (formattedTime === "" || date === "") {
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
        groupId: uuid.v4(),
        members: baseGroup.members,
        loc: baseGroup.loc,
        locRange: baseGroup.locRange,
        date,
        time: formattedTime,
        baseGroups: [baseGroup.groupId],
        isVisible: false,
        ageRange: useDefault
          ? baseGroup.ageRange
          : { minAge: ageRange[0], maxAge: ageRange[1] },
        genderPref: useDefault ? baseGroup.genderPref : genderPref,
        name: useDefault ? baseGroup.name : name,
        bio: useDefault ? baseGroup.bio : bio,
        tempGroups: [],
      }
      // dispatch({ type: ADD_TEMP_GROUP, payload });
      // await addTempGroup(payload);
      createTempGroup(payload)
      navigation.navigate("View Single Group")
    }
  }
  //   groupId:string;
  //     ageRange:AgeRange;
  //     baseGroup:string;
  //     bio:string;
  //     date:string;
  //     genderPref:string;
  //     isVisible:boolean;
  //     loc:Location;
  //     locRange:number;
  //     members:string[];
  //     name:string;
  //     time:string;
  ;`   `
  return (
    <ScrollView ref={scrollRef}>
      {baseGroup ? (
        <View>
          <Text>{`Base Group: ${baseGroup.name}`}</Text>
          <Text>Select Date</Text>
          <MonthPicker
            updateDate={(date) => {
              setDate(date)
              setSelected(true)
            }}
          />

          {/*selected && (
        <DateTimePicker
          value={time}
          mode='time'
          is24Hour={false}
          display='default'
          onChange={setTimePicker}
        />
      )*/}
          {formattedTime !== "" && <Text>Selected Time: {formattedTime}</Text>}
          <Text>Use Same Values As Group</Text>
          <Switch value={useDefault} onValueChange={changeSwitch} />
          {useDefault ? (
            <View>
              <Text>{`Event Name: ${baseGroup.name}`}</Text>
              <Text>{`Event Bio: ${baseGroup.bio}`}</Text>
              <Text>{`Gender Pref: ${baseGroup.genderPref}`}</Text>
              <Text>{`Age Range: ${baseGroup.ageRange.minAge}-${baseGroup.ageRange.maxAge}`}</Text>
            </View>
          ) : (
            <View>
              <Text>Event Name</Text>
              <AppTextInput
                value={name}
                onChangeText={(text) => setName(text)}
                leftIcon="card-text"
                placeholder="Enter Event Name"
                autoCapitalize="none"
              />
              <Text>Event Bio</Text>
              <AppTextInput
                value={bio}
                onChangeText={(text) => setBio(text)}
                leftIcon="card-text"
                placeholder="Enter a short Bio"
                autoCapitalize="none"
              />
              <Text>{baseGroup.genderPref}</Text>
              <GenderPreference
                checked={genderPref}
                setChecked={setGenderPref}
              />
              <Slider
                multiSliderValue={ageRange}
                setMultiSliderValue={setAgeRange}
              />
            </View>
          )}
          <AppButton title="Create Event" onPress={createEvent} />
          <FlashMessage />
        </View>
      ) : (
        <View />
      )}
    </ScrollView>
  )
}

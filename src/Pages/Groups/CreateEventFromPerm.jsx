import React, { useRef, useState } from "react"
import { View, Text, ScrollView, Switch, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import AppButton from "../../Components/AppButton"
import MonthPicker from "../../Components/MonthPicker"
import moment from "moment"
import { showMessage, hideMessage } from "react-native-flash-message"
import FlashMessage from "react-native-flash-message"
import AgeRange from "../../Components/AgeRange"
import uuid from "react-native-uuid"
import AppTextInput from "../../Components/AppTextInput"
import GenderPreference from "../../Components/GenderPreference"
import { createEvent } from "../../Socket/SocketMethods"
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps"
import { GROUPS_SINGLE_GROUP } from "../../Constants/screens"

export default function CreateTempFromPerm({ navigation, route }) {
  const { groupId } = route.params
  const baseGroup = useSelector((state) =>
    state.groups.find((gr) => gr.groupId === groupId)
  )
  const [name, setName] = useState(baseGroup ? baseGroup.name : "")
  const [bio, setBio] = useState(baseGroup ? baseGroup.bio : "")
  const [date, setDate] = useState("")
  const [time, setTime] = useState(new Date())
  const [locRange, setLocRange] = useState(25)
  const [loc, setLoc] = useState({
    latitude: 43.6532,
    longitude: -79.3832,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  })
  const mapRef = useRef()
  const [ageRange, setAgeRange] = useState(
    baseGroup ? baseGroup.ageRange : { minAge: 18, maxAge: 100 }
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
  const createNewEvent = async () => {
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
        eventId: uuid.v4(),
        members: baseGroup.members,
        loc: { lat: loc.latitude, lon: loc.longitude },
        locRange: locRange,
        date,
        time: formattedTime,
        baseGroups: [baseGroup.groupId],
        isVisible: false,
        ageRange: useDefault ? baseGroup.ageRange : ageRange,
        genderPref: useDefault ? baseGroup.genderPref : genderPref,
        name: useDefault ? baseGroup.name : name,
        bio: useDefault ? baseGroup.bio : bio,
        events: [],
      }
      createEvent(payload)
      navigation.navigate(GROUPS_SINGLE_GROUP, { groupId: groupId })
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
          <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={loc}
            style={styles.map}
            ref={mapRef}
            onPress={(e) => {
              mapRef.current?.animateToRegion(
                {
                  ...e.nativeEvent.coordinate,
                  latitudeDelta: 0.015 * locRange,
                  longitudeDelta: 0.015 * locRange,
                },
                1500
              )
              setLoc({
                ...e.nativeEvent.coordinate,
                latitudeDelta: 0.015 * locRange,
                longitudeDelta: 0.015 * locRange,
              })
            }}
          >
            <Marker coordinate={loc}></Marker>
            <Circle
              center={loc}
              radius={locRange * 1000}
              fillColor={"rgba(255, 0, 0, 0.07)"}
            ></Circle>
          </MapView>
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
              <AgeRange ageRange={ageRange} setAgeRange={setAgeRange} />
            </View>
          )}
          <AppButton title="Create Event" onPress={createNewEvent} />
          <FlashMessage />
        </View>
      ) : (
        <View />
      )}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  map: { width: "100%", height: 250 },
})

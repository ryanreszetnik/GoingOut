import React, { useRef, useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import AppButton from "../../Components/AppButton"
import MonthPicker from "../../Components/MonthPicker"
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"
import { showMessage, hideMessage } from "react-native-flash-message"
import FlashMessage from "react-native-flash-message"
import uuid from "react-native-uuid"
import AppTextInput from "../../Components/AppTextInput"
import { createEvent } from "../../Socket/socketMethods"
import GenderPicker from "../../Components/GenderPreference"
import UserList from "../../Components/UserList"
import { searchUser } from "../../Endpoints/friendsEndpoints"
import AgeRange from "../../Components/AgeRange"
import MapView, {
  PROVIDER_GOOGLE,
  animateToRegion,
  Marker,
  Circle,
} from "react-native-maps"
import { EVENTS_VIEW } from "../../Constants/screens"

export default function CreateEvent({ navigation }) {
  const groups = useSelector((state) => state.groups)
  const curSub = useSelector((state) => state.profile.sub)
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [genderPref, setGenderPref] = useState("None")
  const [date, setDate] = useState("")
  const [time, setTime] = useState(new Date())
  const [members, setMembers] = useState([curSub])
  const [friends, setFriends] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [ageRange, setAgeRange] = useState({ minAge: 18, maxAge: 100 })
  const [loc, setLoc] = useState({
    latitude: 43.6532,
    longitude: -79.3832,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  })
  const [locRange, setLocRange] = useState(1)
  const [show, setShow] = useState(false)

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
  const mapRef = useRef()
  const createNewEvent = async () => {
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
        loc: { lat: loc.latitude, lon: loc.longitude },
        locRange,
        ageRange: ageRange,
        genderPref,
        events: [],
        eventId: uuid.v4(),
        members,
        date,
        time: moment(time).format("LT"),
        baseGroups: [],
        isVisible: false,
        name,
        bio,
      }
      console.log(payload)
      createEvent(payload)
      navigation.navigate(EVENTS_VIEW)
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
          setShow(true)
        }}
      />
      <Text>Select Time</Text>
      {show && (
        <DateTimePicker
          value={time}
          mode='time'
          is24Hour={false}
          display='default'
          onChange={(e, newTime) => {
            if (e.type === "dismissed") {
              setShow(false)
              setTime(time)
            }
            if (newTime) {
              setShow(false)
              setTime(newTime)
            }
          }}
        />
      )}
      <GenderPicker setChecked={setGenderPref} checked={genderPref} />
      <Text>Choose Event Location</Text>
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
      <AgeRange ageRange={ageRange} setAgeRange={setAgeRange} />
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
      <AppButton title='Create Event' onPress={createNewEvent} />
      <FlashMessage />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  map: { width: "100%", height: 250 },
})

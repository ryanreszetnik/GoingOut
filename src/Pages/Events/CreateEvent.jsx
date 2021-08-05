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
import { createEvent } from "../../Socket/SocketMethods"
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
import { EVENTS_LOCATION_SELECT, EVENTS_VIEW } from "../../Constants/screens"
import CustomMarker from "../../Components/CustomMarker"
import CustomDateTimePicker from "../../Components/CustomDateTimePicker"

export default function CreateEvent({ navigation }) {
  const groups = useSelector((state) => state.groups)
  const curSub = useSelector((state) => state.profile.sub)
  const [startTime, setStartTime] = useState(Date.now())
  const [endTime, setEndTime] = useState(Date.now())
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [genderPref, setGenderPref] = useState("None")
  const [date, setDate] = useState("")
  const [time, setTime] = useState(new Date())
  const [members, setMembers] = useState([curSub])
  const [friends, setFriends] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [ageRange, setAgeRange] = useState({ minAge: 18, maxAge: 100 })
  const mapRef = useRef()
  const [loc, setLoc] = useState({
    lat: 43.6532,
    lon: -79.3832,
    name: "",
  })
  const [shownLocation, setShownLocation] = useState({
    latitude: 43.6532,
    longitude: -79.3832,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  })
  const [mapRegion, setMapRegion] = useState({
    latitude: 43.6532,
    longitude: -79.3832,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  })
  const [locRange, setLocRange] = useState(1)
  const [show, setShow] = useState(false)

  const updateLocation = (data) => {
    console.log("RECIEVED", data)
    const newRegion = {
      latitude: data.lat,
      longitude: data.lon,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }
    setShownLocation(newRegion)
    setLoc(data)
    mapRef.current.animateToRegion(newRegion, 1500)
  }

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
        eventId: uuid.v4(),
        name: name,
        startTime: 0,
        endTime: 0,
        cancelled: false,
        location: {
          latitude: 0,
          longitude: 0,
          name: "",
          address: "",
          locationId: "",
        },
        locRange: 0,
        members: [],
        confirmed: [],

        bio: "",
        ageRange: { minAge: 0, maxAge: 0 },
        genderPref: "",
        isVisible: false,

        averageAge: 0,
        averageGender: 0,
        numMales: 0,
        numFemales: 0,

        baseGroups: [],
        events: [],
      }
      console.log(payload)
      createEvent(payload)
      navigation.navigate(EVENTS_VIEW)
    }
  }

  return (
    <ScrollView ref={scrollRef}>
      <CustomDateTimePicker
        title="Starts"
        time={startTime}
        setTime={setStartTime}
      />
      <CustomDateTimePicker
        title="Ends"
        time={endTime}
        setTime={setEndTime}
        minDate={startTime}
      />
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

      <GenderPicker setChecked={setGenderPref} checked={genderPref} />
      <Text>Choose Event Location</Text>
      <AppButton
        title="Edit Location"
        onPress={() =>
          navigation.navigate(EVENTS_LOCATION_SELECT, {
            callBack: updateLocation,
          })
        }
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
        onRegionChange={(e) => {
          setMapRegion(e)
        }}
        style={styles.map}
        ref={mapRef}
      >
        <CustomMarker
          coordinate={shownLocation}
          label={loc.name}
        ></CustomMarker>
        <Circle
          center={shownLocation}
          radius={locRange * 1000}
          fillColor={"rgba(255, 0, 0, 0.07)"}
        ></Circle>
      </MapView>
      <AgeRange ageRange={ageRange} setAgeRange={setAgeRange} />
      <UserList subs={members} onPress={removeMember} horizontal={true} />
      <AppTextInput
        value={searchTerm}
        onChangeText={(text) => updateSearch(text)}
        leftIcon="magnify"
        placeholder="Search For Users"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <UserList
        onPress={addMember}
        subs={friends.filter((f) => !members.some((m) => m === f))}
      />
      <AppButton title="Create Event" onPress={createNewEvent} />
      <FlashMessage />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  map: { width: "100%", height: 250 },
})

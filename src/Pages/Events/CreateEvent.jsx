import React, { useRef, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
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
import LocationRange from "../../Components/LocationRange"
import MapView, {
  PROVIDER_GOOGLE,
  animateToRegion,
  Marker,
  Circle,
} from "react-native-maps"
import {
  EVENTS_EDIT_MEMBERS,
  EVENTS_LOCATION_SELECT,
  EVENTS_VIEW,
} from "../../Constants/screens"
import CustomMarker from "../../Components/CustomMarker"
import CustomDateTimePicker from "../../Components/CustomDateTimePicker"
import { PAGE_BACKGROUND_COLOR } from "../../Theme/theme.style"
import { useEffect } from "react"
import AppSwitch from "../../Components/AppSwitch"
import CategorySelection from "../../Components/CategorySelection"

export default function CreateEvent({ navigation }) {
  const curSub = useSelector((state) => state.profile.sub)
  const [startTime, setStartTime] = useState(Date.now())
  const [endTime, setEndTime] = useState(Date.now())
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [notes, setNotes] = useState("")
  const [genderPref, setGenderPref] = useState("None")
  const [locRange, setLocRange] = useState(50)
  const [members, setMembers] = useState([curSub])
  const [visible, setVisible] = useState(false)
  const [ageRange, setAgeRange] = useState({ minAge: 18, maxAge: 100 })
  const [category, setCategory] = useState(null)

  const [loc, setLoc] = useState({
    latitude: 43.6532,
    longitude: -79.3832,
    name: "",
    address: "",
    locationId: null,
  })

  const [shownLocation, setShownLocation] = useState({
    latitude: 43.6532,
    longitude: -79.3832,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  })

  const updateLocation = (data) => {
    console.log("RECIEVED", data)
    const newRegion = {
      latitude: data.latitude,
      longitude: data.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }
    setShownLocation(newRegion)
    setLoc(data)
    // mapRef.current.animateToRegion(newRegion, 1500)
  }

  const removeMember = (sub) => {
    sub !== curSub && setMembers((mem) => mem.filter((m) => m !== sub))
  }

  const updateLocationRange = (newRange) => {
    setLocRange(newRange)
    const newRegion = {
      latitude: shownLocation.latitude,
      longitude: shownLocation.longitude,
      latitudeDelta: 0.02 * newRange,
      longitudeDelta: 0.02 * newRange,
    }
    setShownLocation(newRegion)
    // mapRef.current.animateToRegion(newRegion, 1000)
  }
  const scrollRef = useRef()

  const createNewEvent = async () => {
    if (name === "") {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      })
      const message = {
        message: "Please name the event",
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
        notes: notes,
        category: category,
        startTime: startTime,
        endTime: endTime,
        cancelled: false,
        location: loc,
        locRange: locRange,
        members: members,
        confirmed: [],

        bio: bio,
        ageRange: ageRange,
        genderPref: genderPref,
        isVisible: visible,

        baseGroups: [],
        events: [],
      }
      console.log(payload)
      createEvent(payload, false)
      navigation.navigate(EVENTS_VIEW)
    }
  }

  return (
    <ScrollView ref={scrollRef} style={styles.page}>
      <Text style={styles.title}>Event Details</Text>
      <AppTextInput
        label="Event Name"
        required
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter Event Name"
        autoCapitalize="none"
      />
      <View style={{ paddingBottom: 10, paddingTop: 10 }}>
        <AppTextInput
          label="Event Notes"
          value={notes}
          onChangeText={(text) => setNotes(text)}
          placeholder="Enter any private event details"
          autoCapitalize="none"
        />
      </View>
      <CustomDateTimePicker
        title="Starts"
        time={startTime}
        setTime={setStartTime}
      />
      <CustomDateTimePicker
        title="Ends"
        time={endTime}
        minTime={startTime}
        setTime={setEndTime}
      />
      <CategorySelection value={category} onChange={setCategory} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(EVENTS_LOCATION_SELECT, {
            callBack: updateLocation,
            initialLocation: loc,
          })
        }
        style={{
          height: 40,
          marginTop: 4,
          backgroundColor: "#555",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ width: "50%" }}>
          <Text
            style={{
              color: "white",
              fontSize: 17,
              fontWeight: "500",
              paddingLeft: 15,
            }}
          >
            Location
          </Text>
        </View>
        <View style={{ width: "50%", alignItems: "flex-end", paddingRight: 5 }}>
          <Text style={{ color: "white", fontSize: 17, fontWeight: "500" }}>
            {loc.name.length > 0 ? loc.name : "Not Set"}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{ paddingBottom: 10 }}>
        <Text style={styles.title}>Members</Text>
        <UserList
          subs={members}
          removeIcon
          onPress={(sub) => removeMember(sub)}
          horizontal={true}
          addMember={() =>
            navigation.navigate(EVENTS_EDIT_MEMBERS, {
              initialMembers: members,
              setMembers: setMembers,
            })
          }
        />
      </View>
      <Text style={styles.title}>Matching Preferences</Text>
      <AppSwitch
        value={visible}
        onChange={() => setVisible((v) => !v)}
        label="Private Event"
      />
      <AppTextInput
        label="Event Bio"
        value={bio}
        onChangeText={(text) => setBio(text)}
        leftIcon="card-text"
        placeholder="Enter a short public bio"
        autoCapitalize="none"
      />
      <LocationRange locRange={locRange} setLocRange={updateLocationRange} />
      <AgeRange ageRange={ageRange} setAgeRange={setAgeRange} />
      <GenderPicker setChecked={setGenderPref} checked={genderPref} />
      <View style={{ alignItems: "center" }}>
        <AppButton title="Create Event" onPress={createNewEvent} />
      </View>
      <FlashMessage />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  map: { width: "100%", height: 250 },
  page: {
    backgroundColor: PAGE_BACKGROUND_COLOR,
    paddingTop: 10,
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
  },
  fieldName: {
    color: "white",
  },
})

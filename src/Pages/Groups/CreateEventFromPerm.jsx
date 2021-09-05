import React, { useRef, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { useSelector } from "react-redux"
import AppButton from "../../Components/AppButton"
import moment from "moment"
import { showMessage, hideMessage } from "react-native-flash-message"
import FlashMessage from "react-native-flash-message"
import AgeRange from "../../Components/AgeRange"
import uuid from "react-native-uuid"
import AppTextInput from "../../Components/AppTextInput"
import GenderPreference from "../../Components/GenderPreference"
import { createEvent } from "../../Socket/socketMethods"
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps"
import {
  GROUPS_LOCATION_SELECT,
  GROUPS_SINGLE_GROUP,
} from "../../Constants/screens"
import { CONTAINER_COLOR, PAGE_BACKGROUND_COLOR } from "../../Theme/theme.style"
import CustomDateTimePicker from "../../Components/CustomDateTimePicker"
import CategorySelection from "../../Components/CategorySelection"
import AppSwitch from "../../Components/AppSwitch"
import GenderPicker from "../../Components/GenderPreference"

export default function CreateTempFromPerm({ navigation, route }) {
  const { groupId } = route.params
  const baseGroup = useSelector((state) =>
    state.groups.find((gr) => gr.groupId === groupId)
  )
  const [name, setName] = useState(baseGroup ? baseGroup.name : "")
  const [bio, setBio] = useState(baseGroup ? baseGroup.bio : "")
  const [notes, setNotes] = useState("")
  const [category, setCategory] = useState("Any")
  const [startTime, updateStartTime] = useState(Date.now())
  const [endTime, updateEndTime] = useState(Date.now())
  const [locRange, setLocRange] = useState(
    typeof baseGroup.locRange === "string"
      ? parseInt(baseGroup.locRange)
      : baseGroup.locRange
  )
  const [visible, setVisible] = useState(false)
  const [loc, updateLocation] = useState({
    latitude: 43.6532,
    longitude: -79.3832,
    name: "",
    address: "",
    locationId: null,
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

  const scrollRef = useRef()

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
        setTime={updateStartTime}
      />
      <CustomDateTimePicker
        title="Ends"
        time={endTime}
        minTime={startTime}
        setTime={updateEndTime}
      />
      <CategorySelection value={category} onChange={setCategory} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(GROUPS_LOCATION_SELECT, {
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

      <Text style={styles.title}>Matching Preferences</Text>
      <AppSwitch
        value={visible}
        onChange={() => setVisible((v) => !v)}
        label="Private Event"
      />
      <AppSwitch
        value={useDefault}
        onChange={() => setUseDefault((v) => !v)}
        label="Use Group Settings"
      />
      {useDefault ? (
        <View style={styles.presetValuesContainer}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.fieldLabelText}>Event Bio:</Text>
            <Text style={styles.fieldText}>{baseGroup.bio}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.fieldLabelText}>Location range:</Text>
            <Text style={styles.fieldText}>{`${baseGroup.locRange} km`}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.fieldLabelText}>Age Range:</Text>
            <Text
              style={styles.fieldText}
            >{`${baseGroup.ageRange.minAge}-${baseGroup.ageRange.maxAge}`}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.fieldLabelText}>Gender Preference:</Text>
            <Text style={styles.fieldText}>
              {(baseGroup && baseGroup.genderPref == "Male") ||
              baseGroup.genderPref == "Female"
                ? baseGroup.genderPref
                : "None"}
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <AppTextInput
            label="Event Bio"
            value={bio}
            onChangeText={(text) => setBio(text)}
            leftIcon="card-text"
            placeholder="Enter a short public bio"
            autoCapitalize="none"
          />
          <LocationRange locRange={locRange} setLocRange={setLocRange} />
          <AgeRange ageRange={ageRange} setAgeRange={setAgeRange} />
          <GenderPicker setChecked={setGenderPref} checked={genderPref} />
        </View>
      )}
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
  fieldText: {
    color: "white",
    fontSize: 18,
    fontWeight: "300",
  },
  fieldLabelText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    paddingRight: 5,
  },
  presetValuesContainer: {
    backgroundColor: CONTAINER_COLOR,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    marginTop: 3,
  },
})

import React, { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import AppButton from "../../Components/AppButton"
import { editEvent } from "../../Socket/SocketMethods"
import AppTextInput from "../../Components/AppTextInput"
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps"
import { EVENTS_SINGLE_EVENT } from "../../Constants/screens"

export default function EditEvent({ navigation, route }) {
  const { eventId } = route.params
  const event = useSelector((state) =>
    state.events.find((group) => group.eventId === eventId)
  )
  const [name, setName] = useState(event.name)
  const [bio, setBio] = useState(event.bio)
  const [loc, setLoc] = useState({
    latitude: parseFloat(event.loc.lat),
    longitude: parseFloat(event.loc.lon),
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  })
  const mapRef = useRef()
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
      loc: { lat: loc.latitude, lon: loc.longitude },
      time: moment(time).format("LT"),
    }
    editEvent(newEvent)
    navigation.navigate(EVENTS_SINGLE_EVENT, { eventId: eventId })
  }
  return (
    <ScrollView>
      <AppTextInput
        value={name}
        onChangeText={(text) => setName(text)}
        leftIcon="form-textbox"
        placeholder="Enter Event Name"
        autoCapitalize="none"
      />
      <AppTextInput
        value={bio}
        onChangeText={(text) => setBio(text)}
        leftIcon="form-textbox"
        placeholder="Enter Event Bio"
        autoCapitalize="none"
      />
      <Text>Current Time: {moment(time).format("LT")}</Text>

      <AppButton
        title="Change Time "
        onPress={() => {
          setShow(true)
        }}
      ></AppButton>
      {show && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="default"
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
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={loc}
        style={styles.map}
        ref={mapRef}
        onPress={(e) => {
          mapRef.current?.animateToRegion(
            {
              ...e.nativeEvent.coordinate,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            },
            1500
          )
          setLoc({
            ...e.nativeEvent.coordinate,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          })
        }}
      >
        <Marker coordinate={loc}></Marker>
        <Circle
          center={loc}
          radius={event.locRange * 1000}
          fillColor={"rgba(255, 0, 0, 0.07)"}
        ></Circle>
      </MapView>
      <AppButton title="Save Changes" onPress={onEdit} />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  map: { width: "100%", height: 250 },
})

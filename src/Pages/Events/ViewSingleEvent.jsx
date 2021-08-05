import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native"
import { useSelector } from "react-redux"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AppButton from "../../Components/AppButton"
import MatchPreview from "../../Components/MatchPreview"
import { leaveEvent } from "../../Socket/SocketMethods"
import GroupImage from "../../Components/GroupImage"
import moment from "moment"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import {
  EVENTS_EDIT_EVENT,
  EVENTS_MEMBERS,
  EVENTS_SEARCH_MATCHES,
  EVENTS_SINGLE_MATCH,
  EVENTS_VIEW,
  EVENTS_CHAT,
  EVENTS_POTENTIAL_LOCATION,
} from "../../Constants/screens"
import SmallButton from "../../Components/SmallButton"
import LocationRecommendations from "../../Components/LocationRecommendations"
export default function ViewSingleEvent({ navigation, route }) {
  const { eventId } = route.params
  const matches = useSelector((state) =>
    state.matches.filter((gr) => gr.eventId === eventId)
  )
  const confirmLeave = () => {
    const leave = event.members.length !== 1
    navigation.navigate(EVENTS_VIEW)
    leaveEvent(eventId, leave)
  }

  const event = useSelector((state) =>
    state.events.find((group) => group.eventId === eventId)
  )

  const onPress = () => {
    navigation.navigate(EVENTS_SEARCH_MATCHES, { eventId: eventId })
  }
  const goToMatch = (match) => {
    console.log(match.matchId, match.otherEvent.name)
    navigation.navigate(EVENTS_SINGLE_MATCH, {
      eventId: eventId,
      matchId: match.matchId,
    })
  }
  const goToChat = () => {
    navigation.navigate(EVENTS_CHAT, {
      eventId: eventId,
    })
  }
  const goToMembers = () => {
    navigation.navigate(EVENTS_MEMBERS, { eventId: eventId })
  }

  const leaveEventHere = () => {
    Alert.alert("Leave Event", "Are you sure you want to leave?", [
      { text: "Cancel", style: "cancel" },
      { text: "Leave", onPress: confirmLeave },
    ])
  }
  return (
    <ScrollView style={styles.container}>
      {event && (
        <View style={styles.attributeContainer}>
          <View style={styles.topContainer}>
            <GroupImage photoIds={event.members} size={100} />
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={{ paddingLeft: 5 }}>
              {`${
                moment(`${event.date}`)
                  .calendar(null, {
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    nextWeek: "dddd",
                    lastDay: "[Yesterday]",
                    lastWeek: "[Last] dddd",
                    sameElse: "DD/MM/YYYY",
                  })
                  .split(" at")[0]
              } ${
                event.time === "Not Set" ? "(Time not set)" : `at ${event.time}`
              }`}
            </Text>
            <Text style={styles.attributeTxt}>{event.bio}</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <SmallButton
                size={40}
                icon='users'
                text='Members'
                onPress={goToMembers}
                style={{ width: 100 }}
              />
              <SmallButton
                size={40}
                icon='comments'
                text='Chat'
                onPress={goToChat}
                style={{ width: 100 }}
              />
              <SmallButton
                size={40}
                icon='search'
                text='Find Matches'
                onPress={onPress}
                style={{ width: 100 }}
              />
              <SmallButton
                size={40}
                icon='sign-out-alt'
                text='Leave'
                onPress={leaveEventHere}
                style={{ width: 100 }}
              />
            </View>
          </View>

          <MapView
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: parseFloat(event.loc.lat),
              longitude: parseFloat(event.loc.lon),
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            scrollEnabled={false}
            style={styles.map}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(event.loc.lat),
                longitude: parseFloat(event.loc.lon),
              }}
            ></Marker>
          </MapView>
          {matches.length > 0 && (
            <View style={styles.txtField}>
              <Text>Matches</Text>
              {matches.map((match) => {
                return (
                  <MatchPreview
                    key={match.matchId}
                    match={match}
                    onPress={goToMatch}
                  />
                )
              })}
            </View>
          )}
          <View style={styles.txtField}>
            <Text>Recomended Nearby Locations</Text>
            <LocationRecommendations
              loc={event.loc}
              onPress={(selectedLoc) =>
                navigation.navigate(EVENTS_POTENTIAL_LOCATION, {
                  eventId: eventId,
                  location: selectedLoc,
                })
              }
            />
          </View>
        </View>
      )}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
  },
  img: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    marginLeft: "10%",
  },
  imageFriends: {
    flexDirection: "row",
  },
  imgText: {
    backgroundColor: "#c0c0c0",
    padding: 5,
    marginLeft: "30%",
    borderRadius: 5,
    alignSelf: "center",
  },
  imgTitle: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 15,
  },
  attributeContainer: {
    marginVertical: 10,
  },
  txtField: {
    borderTopWidth: 0.5,
    marginVertical: 5,
    paddingVertical: 5,
  },

  attributeTxt: {
    fontSize: 20,
    paddingVertical: 2,
    marginVertical: 2,
  },
  map: { width: "100%", height: 250 },
  eventName: { fontSize: 22, fontWeight: "600" },
  topContainer: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
})

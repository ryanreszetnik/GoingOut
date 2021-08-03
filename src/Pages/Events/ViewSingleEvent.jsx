import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AppButton from "../../Components/AppButton"
import MatchPreview from "../../Components/MatchPreview"
import { leaveEvent } from "../../Socket/socketMethods"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import {
  EVENTS_EDIT_EVENT,
  EVENTS_MEMBERS,
  EVENTS_SEARCH_MATCHES,
  EVENTS_SINGLE_MATCH,
  EVENTS_VIEW,
} from "../../Constants/screens"
export default function ViewSingleEvent({ navigation, route }) {
  const { eventId } = route.params
  const matches = useSelector((state) =>
    state.matches.filter((gr) => gr.eventId === eventId)
  )

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
  const editEvent = () => {
    navigation.navigate(EVENTS_EDIT_EVENT, { eventId: eventId })
  }
  const goToMembers = () => {
    navigation.navigate(EVENTS_MEMBERS, { eventId: eventId })
  }

  const leaveEventHere = () => {
    const leave = event.members.length !== 1
    navigation.navigate(EVENTS_VIEW)
    leaveEvent(eventId, leave)
  }
  return (
    <ScrollView style={styles.container}>
      {event && (
        <View style={styles.attributeContainer}>
          <View style={styles.txtField}>
            <Text>
              <MaterialCommunityIcons
                name="form-textbox"
                size={20}
                color="#6e6869"
                style={styles.icon}
              />
              {`  Group Name`}
            </Text>
            <Text style={styles.attributeTxt}>{event.name}</Text>
          </View>
          <View style={styles.txtField}>
            <Text>
              <MaterialCommunityIcons
                name="card-text"
                size={20}
                color="#6e6869"
                style={styles.icon}
              />
              {`  Bio`}
            </Text>
            <Text style={styles.attributeTxt}>{event.bio}</Text>
          </View>
          <View style={styles.txtField}>
            <Text>
              <MaterialCommunityIcons
                name="google-maps"
                size={20}
                color="#6e6869"
                style={styles.icon}
              />
              {`  Location`}
            </Text>
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
          </View>
          {matches.map((match) => {
            return (
              <MatchPreview
                key={match.matchId}
                match={match}
                onPress={goToMatch}
              />
            )
          })}
          <AppButton title="Find Matches" onPress={onPress}></AppButton>
          <AppButton title="Members" onPress={goToMembers} />
          <AppButton title="Leave Event" onPress={leaveEventHere} />
          <AppButton title="Edit Event Details" onPress={editEvent} />
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
})

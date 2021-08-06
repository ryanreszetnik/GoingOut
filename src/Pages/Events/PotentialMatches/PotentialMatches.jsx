import React, { Fragment, useEffect, useState } from "react"
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { SET_FOUND_MATCHES } from "../../../Constants/reducerEvents"
import { EVENTS_POTENTIAL_MATCH } from "../../../Constants/screens"
import { searchMatches } from "../../../Endpoints/eventEndpoints"
import PotentialMatchPreview from "../../../Components/PotentialMatchPreview"

export default function PotentialMatches({ navigation, route }) {
  const { eventId } = route.params
  const event = useSelector((state) =>
    state.events.find((e) => e.eventId === eventId)
  )
  const dispatch = useDispatch()
  const moveToView = (id) => {
    navigation.navigate(EVENTS_POTENTIAL_MATCH, {
      otherEventId: id,
      eventId: eventId,
    })
  }

  const matches = useSelector((state) => state.foundMatches)
  console.log("loaded", matches)

  useEffect(() => {
    const loadMatches = async () => {
      console.log("Starting")
      dispatch({
        type: SET_FOUND_MATCHES,
        payload: null,
      })
      const newMatches = await searchMatches(eventId)
      console.log(newMatches)
      dispatch({
        type: SET_FOUND_MATCHES,
        payload: newMatches,
      })
    }
    loadMatches()
  }, [eventId])

  return (
    <View>
      <View style={{ backgroundColor: "gold" }}>
        <Text>{`Searching For: ${event.name}`}</Text>
        <Text>{`Location Range: ${event.locRange} km`}</Text>
        <Text>{`Age Range: ${event.ageRange.minAge}-${event.ageRange.maxAge}`}</Text>
        <Text>{`Gender Preference: ${event.genderPref}`}</Text>
      </View>
      <ScrollView>
        {!matches ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" color="tomato" />
          </View>
        ) : (
          <View style={styles.container}>
            {matches.map((match) => {
              return (
                <PotentialMatchPreview
                  match={match}
                  key={match.eventId}
                  onPress={moveToView}
                />
              )
            })}
            {matches.length === 0 && (
              <View>
                <Text>No matches found... come back later</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DDD",
    minHeight: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

import React, { Fragment, useEffect, useState } from "react"
import { View, ActivityIndicator, StyleSheet, ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { SET_FOUND_MATCHES } from "../../../Constants/reducerEvents"
import { EVENTS_POTENTIAL_MATCH } from "../../../Constants/screens"
import { searchMatches } from "../../../Endpoints/eventEndpoints"
import PotentialMatchPreview from "../../../Components/PotentialMatchPreview"

export default function PotentialMatches({ navigation, route }) {
  const { eventId } = route.params
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
        </View>
      )}
    </ScrollView>
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

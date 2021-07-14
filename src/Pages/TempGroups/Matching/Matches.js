import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"

import {
  SET_CUR_FOUND_MATCH,
  SET_CUR_TEMP_GROUP,
  SET_FOUND_MATCHES,
} from "../../../Actions/groupActions"
import { searchMatches } from "../../../Endpoints/tempGroupsEndpoints"
import PotentialMatchPreview from "./PotentialMatchPreview"

export default function Matches({ navigation }) {
  const dispatch = useDispatch()
  const moveToView = (id) => {
    dispatch({ type: SET_CUR_FOUND_MATCH, payload: id })
    navigation.navigate("View Single Potential Match")
  }
  const matches = useSelector((state) => state.foundMatches)

  const curBaseGroup = useSelector((state) => state.current.tempGroup)

  useEffect(() => {
    const loadMatches = async () => {
      dispatch({
        type: SET_FOUND_MATCHES,
        payload: null,
      })
      dispatch({
        type: SET_FOUND_MATCHES,
        payload: await searchMatches(curBaseGroup),
      })
    }
    loadMatches()
  }, [curBaseGroup])

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
                key={match.groupId}
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

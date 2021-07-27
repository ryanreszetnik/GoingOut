import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AppButton from "../../../Components/AppButton"
import MatchPreview from "./Matches/MatchPreview"
import { SET_CUR_MATCH } from "../../Actions/groupActions"
import { leaveTempGroup } from "../../Socket/SocketMethods"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
export default function ViewSingleTempGroup({ navigation }) {
  const matches = useSelector((state) =>
    state.matches.filter((gr) => gr.groupId === curGroup)
  )
  const dispatch = useDispatch()
  const curGroup = useSelector((state) => state.current.tempGroup)
  const event = useSelector((state) =>
    state.tempGroups.find((group) => group.groupId === curGroup)
  )

  const onPress = () => {
    navigation.navigate("Search For Matches")
  }
  const goToMatch = (match) => {
    console.log(match.matchId, match.otherGroup.name)
    dispatch({ type: SET_CUR_MATCH, payload: match.matchId })
    navigation.navigate("View Single Match")
  }
  const editEvent = () => {
    navigation.navigate("Edit Event")
  }
  const goToMembers = () => {
    navigation.navigate("Members")
  }

  const leaveEvent = () => {
    const leave = event.members.length !== 1
    navigation.navigate("View Temp Groups")
    leaveTempGroup(curGroup, leave)
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
                  latitude: event.loc.lat,
                  longitude: event.loc.lon,
                }}
              ></Marker>
            </MapView>
          </View>
          <AppButton title="Find Matches" onPress={onPress}></AppButton>
          <AppButton title="Members" onPress={goToMembers} />
          <AppButton title="Leave Event" onPress={leaveEvent} />
          <AppButton title="Edit Event Details" onPress={editEvent} />
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

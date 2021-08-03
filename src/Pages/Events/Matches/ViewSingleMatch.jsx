import React from "react"
import { View, Text, StyleSheet } from "react-native"
import AppButton from "../../../Components/AppButton"
import { useSelector } from "react-redux"
import { EVENTS_MATCH_CHAT } from "../../../Constants/screens"

export default function ViewSingleMatch({ navigation, route }) {
  const { eventId, matchId } = route.params

  const match = useSelector((state) =>
    state.matches.find((ma) => ma.matchId === matchId && ma.eventId === eventId)
  )

  const onPress = () => {
    console.log("Going to existing match")
    navigation.navigate(EVENTS_MATCH_CHAT, {
      eventId: eventId,
      matchId: matchId,
    })
  }
  return (
    <View style={styles.container}>
      {match ? (
        <View style={{ alignItems: "center" }}>
          <Text>{match.otherEvent.name}</Text>
          <AppButton title={"Chat"} onPress={onPress} />
        </View>
      ) : (
        <Text>Loading</Text>
      )}
    </View>
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
})

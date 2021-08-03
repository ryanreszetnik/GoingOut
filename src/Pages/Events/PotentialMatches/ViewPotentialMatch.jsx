import React, { useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import AppButton from "../../../Components/AppButton"
import { useSelector } from "react-redux"
import uuid from "react-native-uuid"
import { matchWithEvent } from "../../../Socket/SocketMethods"
import UserList from "../../../Components/UserList"
import { EVENTS_SINGLE_MATCH } from "../../../Constants/screens"

export default function ViewPotentialMatch({ navigation, route }) {
  const { eventId, otherEventId } = route.params

  const match = useSelector((state) =>
    state.foundMatches.find((ma) => ma.eventId === otherEventId)
  )

  const onPress = () => {
    const newId = uuid.v4()
    matchWithEvent(eventId, newId, match.eventId)
    navigation.pop(2)
    navigation.navigate(EVENTS_SINGLE_MATCH, {
      eventId: eventId,
      matchId: newId,
    })
  }
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text>{`Group Name: ${match.name}`}</Text>
        <Text>{`Group Bio: ${match.bio}`}</Text>
        <Text>{`Time: ${match.time}`}</Text>
        <UserList
          onPress={() => {}}
          subs={match.members}
          priority={2}
          showFriendships={false}
        />
        <AppButton title={"Start Chatting"} onPress={onPress} />
      </View>
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

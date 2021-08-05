import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useSelector } from "react-redux"
import EventPreview from "../../Components/EventPreview"
import UserList from "../../Components/UserList"

import { REQUEST } from "../../Constants/constants"
import {
  NOTIFICATIONS_PAGE,
  NOTIFICATIONS_PROFILE,
} from "../../Constants/screens"
import { appLoad, loadUsers } from "../../Endpoints/generalEndpoints"
import Notification from "./Notification"
import { navigate } from "../../Navigation/RootNavigation"
import { EVENTS_SINGLE_EVENT } from "../../Constants/screens"

export default function Notifications({ navigation }) {
  const friends = useSelector((state) => state.friends)
  const notifications = useSelector((state) => state.notifications)
  const requests = friends
    .filter((friend) => friend.status === REQUEST)
    .map((f) => f.sub)
  const events = useSelector((state) => state.events)
  const nextEvent = events.sort(function (a, b) {
    return `${a.date}T${a.time}` > `${b.date}T${b.time}`
  })[0]
  const selectUser = (profile) => {
    navigation.navigate(NOTIFICATIONS_PROFILE, { sub: profile })
  }
  const moveToView = (id) => {
    console.log("move", id)
    navigate(EVENTS_SINGLE_EVENT, { eventId: id })
  }

  return (
    <ScrollView style={{ backgroundColor: "#111" }}>
      <View style={styles.firstContainer}>
        <Text style={styles.header}>Next Event</Text>
        {nextEvent ? (
          <EventPreview
            event={nextEvent}
            key={nextEvent.eventId}
            onPress={() => moveToView(nextEvent.eventId)}
            id={nextEvent.eventId}
          />
        ) : (
          <Text style={{ color: "white" }}>No events</Text>
        )}
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Requests From:</Text>
        {requests.length > 0 ? (
          <UserList onPress={selectUser} subs={requests} />
        ) : (
          <Text style={{ color: "white" }}>No Requests</Text>
        )}
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>Notifications</Text>
        {notifications.map((not) => {
          return <Notification key={JSON.stringify(not)} notification={not} />
        })}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  firstContainer: {
    paddingBottom: 10,
  },
  container: {
    borderTopColor: "black",
    borderTopWidth: 0.5,
    paddingBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
})

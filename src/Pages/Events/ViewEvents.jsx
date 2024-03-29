import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useSelector } from "react-redux"
import EventPreview from "../../Components/EventPreview"
import { PAGE_BACKGROUND_COLOR } from "../../Theme/theme.style"
import { EVENTS_SINGLE_EVENT } from "../../Constants/screens"

export default function ViewEvents({ navigation }) {
  const events = useSelector((state) =>
    state.events.sort(function (a, b) {
      return a.startTime > b.startTime
    })
  )
  const newEvents = events.filter((gr) => new Date(gr.endTime) >= new Date())
  const oldEvents = events.filter((gr) => new Date(gr.endTime) < new Date())
  const baseEvents = newEvents.filter((gr) => {
    return gr.events.length > 0
  })
  const masterGroups = newEvents.filter((gr) => !baseEvents.includes(gr))

  const moveToView = (id) => {
    navigation.navigate(EVENTS_SINGLE_EVENT, { eventId: id })
  }

  return (
    <ScrollView style={{ backgroundColor: PAGE_BACKGROUND_COLOR }}>
      {(baseEvents.length > 0 || oldEvents.length > 0) && (
        <Text style={styles.header}>
          {`${masterGroups.length == 0 ? "No " : ""}Upcoming Events`}
        </Text>
      )}
      {masterGroups.map((group) => {
        return (
          <EventPreview
            event={group}
            key={group.eventId}
            onPress={() => moveToView(group.eventId)}
            id={group.eventId}
          />
        )
      })}
      {baseEvents.length > 0 && (
        <Text style={styles.header}>Sub Groups for Upcoming</Text>
      )}
      {baseEvents.map((group) => {
        return (
          <EventPreview
            event={group}
            key={group.eventId}
            onPress={() => moveToView(group.eventId)}
            id={group.eventId}
          />
        )
      })}
      {oldEvents.length > 0 && <Text style={styles.header}>Past Events</Text>}
      {oldEvents.map((group) => {
        return (
          <EventPreview
            event={group}
            key={group.eventId}
            onPress={() => moveToView(group.eventId)}
            id={group.eventId}
          />
        )
      })}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
})

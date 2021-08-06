import moment from "moment"
import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useSelector } from "react-redux"
import { LIST_ITEM_BORDER_COLOR, LIST_ITEM_COLOR } from "../Theme/theme.style"
import GroupImage from "./GroupImage"
import Ionicon from "react-native-vector-icons/Ionicons"

export default function EventPreview({ event, onPress }) {
  const groups = useSelector((state) => state.groups)
  const events = useSelector((state) => state.events)
  const allGroups = [...groups, ...events]

  const baseGroups = event.baseGroups
    .map((id) => {
      return allGroups.find((gr) => gr.groupId === id || gr.eventId === id)
    })
    .filter((bg) => bg !== undefined)

  return (
    <View>
      <TouchableOpacity onPress={() => onPress(event)} style={styles.container}>
        <GroupImage photoIds={event.members} size={70} />
        <View style={styles.textContainer}>
          <Text style={styles.header}>{event.name}</Text>
          <View style={{ flexDirection: "row", paddingTop: 3 }}>
            <Ionicon name="calendar-outline" size={15} />

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
              } ${event.time === "Not Set" ? "" : `at ${event.time}`}`}
            </Text>
          </View>

          {baseGroups.length > 0 && (
            <View style={{ flexDirection: "row", paddingTop: 2 }}>
              <Ionicon name="chatbubbles-outline" size={15} />
              <Text style={{ paddingLeft: 5 }}>
                {baseGroups.map((bg) => bg.name).join(", ")}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 80,
    padding: 5,
    flexDirection: "row",
    borderColor: LIST_ITEM_BORDER_COLOR,
    backgroundColor: LIST_ITEM_COLOR,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
  },
  textContainer: {
    paddingLeft: 10,
  },
})

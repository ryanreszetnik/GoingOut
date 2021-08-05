import React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import MonthPicker from "./MonthPicker"
import moment from "moment"
import DateTimePicker from "@react-native-community/datetimepicker"

export default function CustomDateTimePicker({
  title,
  time,
  setTime,
  minDate = null,
}) {
  const [opened, setOpened] = useState(false)

  const selectTime = (e, value) => {
    const newTime = moment(time)
      .set("hour", moment(value).hour())
      .set("minute", moment(value).minute())
    const newDateTime = new Date(newTime.format()).getTime().valueOf()

    setTime(newDateTime)
  }
  const updateDate = (e) => {
    const date = new Date(`${e}T${moment(time).format("hh:mm:ss")}`).getTime()
    setTime(date.valueOf())
    console.log(date)
  }
  return (
    <View>
      <TouchableOpacity
        style={styles.preview}
        onPress={() => setOpened(!opened)}
      >
        <Text style={styles.previewText}>{title}</Text>

        <Text style={styles.previewTextTime}>
          {moment(time).format("MMM DD, YYYY  hh:mm a")}
        </Text>
      </TouchableOpacity>
      {opened && (
        <View style={styles.bottomContainer}>
          <View style={styles.timeContainer}>
            <Text style={styles.previewText}>Time</Text>
            <View style={styles.timeSelector}>
              <DateTimePicker
                style={{
                  backgroundColor: "#CCC",

                  width: 85,
                  height: "100%",
                  color: "green",
                  alignSelf: "flex-end",
                }}
                textColor="white"
                mode="time"
                value={new Date(time)}
                onChange={selectTime}
              />
            </View>
          </View>

          <MonthPicker updateDate={updateDate} minDate={minDate} />
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  preview: {
    width: "100%",
    height: 40,
    backgroundColor: "#555",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  previewText: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
    width: "50%",
  },
  timeSelector: {
    width: "50%",
    height: "100%",
    alignItems: "center",
  },
  previewTextTime: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
    alignItems: "flex-end",
    width: "50%",
  },
  bottomContainer: {
    width: "100%",
    backgroundColor: "#888",
  },
  timeContainer: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
})

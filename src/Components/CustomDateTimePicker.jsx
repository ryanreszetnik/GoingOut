import React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import MonthPicker from "./MonthPicker"
import moment from "moment"
import { Picker } from "@react-native-community/picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import { PAGE_BACKGROUND_COLOR } from "../Theme/theme.style"
import { useEffect } from "react"
import AppSwitch from "./AppSwitch"

const hourList = [...Array(24).keys()]
const minuteList = [...Array(12).keys()].map((n) => n * 5)

export default function CustomDateTimePicker({
  title,
  time,
  setTime,
  minTime = null,
}) {
  const [opened, setOpened] = useState(false)
  const [useDuration, setUseDuration] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)

  const selectTime = (e, value) => {
    const newTime = moment(time)
      .set("hour", moment(value).hour())
      .set("minute", moment(value).minute())
    const newDateTime = new Date(newTime.format()).getTime().valueOf()

    setTime(newDateTime)
  }
  const updateDate = (e) => {
    const date = new Date(`${e}T${moment(time).format("HH:mm:ss")}`).getTime()
    setTime(date.valueOf())
    console.log(date)
  }
  useEffect(() => {
    if (minTime !== null) {
      setTime(minTime + hours * 60000 * 60 + minutes * 60000)
    }
  }, [hours, minutes])

  useEffect(() => {
    if (minTime !== null && minTime > time) {
      setTime(minTime)
    }
  }, [minTime])
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
          {minTime !== null && (
            <AppSwitch
              value={useDuration}
              onChange={setUseDuration}
              label="Select Duration"
            />
          )}
          {useDuration ? (
            <View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Picker
                  selectedValue={hours}
                  style={{
                    width: "25%",
                    color: "white",
                  }}
                  itemStyle={{ height: 125 }}
                  onValueChange={setHours}
                >
                  {hourList.map((h) => (
                    <Picker.Item
                      color="white"
                      label={`${h}`}
                      key={h}
                      value={h}
                    />
                  ))}
                </Picker>
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    paddingRight: 20,
                  }}
                >
                  Hours
                </Text>
                <Picker
                  selectedValue={minutes}
                  style={{
                    width: "25%",
                    color: "white",
                  }}
                  itemStyle={{ height: 125 }}
                  onValueChange={setMinutes}
                >
                  {minuteList.map((h) => (
                    <Picker.Item
                      color="white"
                      label={`${h}`}
                      key={h}
                      value={h}
                    />
                  ))}
                </Picker>
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    paddingRight: 20,
                  }}
                >
                  Minutes
                </Text>
              </View>
            </View>
          ) : (
            <View>
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

              <MonthPicker
                initialDate={time}
                updateDate={updateDate}
                minDate={minTime}
              />
            </View>
          )}
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
    backgroundColor: PAGE_BACKGROUND_COLOR,
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

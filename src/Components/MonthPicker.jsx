import React, { useState } from "react"
import { View, Text } from "react-native"
import CalendarPicker from "react-native-calendar-picker"
import moment from "moment"
import { ACCENT_COLOR } from "../Theme/theme.style"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"
export default function MonthPicker({
  initialDate,
  updateDate,
  minDate = null,
}) {
  const changeDate = (day) => {
    updateDate(moment(day).format("YYYY-MM-DD"))
  }
  console.log("INITIAL", initialDate)
  return (
    <View
      style={{
        backgroundColor: "#666",
        borderColor: "#333",
        margin: 10,
        borderRadius: 10,
      }}
    >
      <CalendarPicker
        restrictMonthNavigation={true}
        minDate={minDate ? minDate : moment()}
        // maxDate={moment().endOf("month").add(1, "days").endOf("month")}
        selectedStartDate={new Date(initialDate)}
        onDateChange={changeDate}
        textStyle={{ color: "#FFF" }}
        selectedDayTextColor="#DDD"
        todayTextStyle="#FFF"
        todayBackgroundColor="#444"
        selectedDayColor={ACCENT_COLOR}
        previousComponent={
          <FontAwesome5Icon name="chevron-left" color="white" size={20} />
        }
        nextComponent={
          <FontAwesome5Icon name="chevron-right" color="white" size={20} />
        }
      />
    </View>
  )
}

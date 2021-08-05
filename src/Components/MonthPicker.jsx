import React, { useState } from "react"
import { View, Text } from "react-native"
import CalendarPicker from "react-native-calendar-picker"
import moment from "moment"
export default function MonthPicker({ updateDate, minDate = null }) {
  const changeDate = (day) => {
    updateDate(moment(day).format("YYYY-MM-DD"))
  }
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
        maxDate={moment().endOf("month").add(1, "days").endOf("month")}
        onDateChange={changeDate}
        textStyle={{ color: "#FFF" }}
        selectedDayTextColor="#DDD"
        todayTextStyle="#FFF"
        todayBackgroundColor="#444"
        selectedDayColor="red"
      />
    </View>
  )
}

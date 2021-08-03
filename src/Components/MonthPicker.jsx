import React, { useState } from "react"
import { SafeAreaView, Text } from "react-native"
import CalendarPicker from "react-native-calendar-picker"
import moment from "moment"
export default function MonthPicker({ updateDate }) {
  const changeDate = (day) => {
    updateDate(moment(day).format("YYYY-MM-DD"))
  }
  return (
    <SafeAreaView>
      <CalendarPicker
        restrictMonthNavigation={true}
        minDate={moment()}
        maxDate={moment().endOf("month").add(1, "days").endOf("month")}
        onDateChange={changeDate}
      />
    </SafeAreaView>
  )
}

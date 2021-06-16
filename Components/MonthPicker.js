import React, { useState } from "react"
import { SafeAreaView, Text } from "react-native"
import CalendarPicker from "react-native-calendar-picker"
import moment from "moment"
export default function MonthPicker({ initialDate, updateDate }) {
  const [date, setDate] = useState(initialDate)
  const changeDate = (day) => {
    updateDate(day)
    setDate(day)
  }
  return (
    <SafeAreaView>
      <CalendarPicker
        selectedStartDate={initialDate}
        restrictMonthNavigation={true}
        minDate={moment()}
        maxDate={moment().endOf("month").add(1, "days").endOf("month")}
        onDateChange={changeDate}
      />
    </SafeAreaView>
  )
}

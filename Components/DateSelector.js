import React, { useState } from "react"
import { View, Text } from "react-native"
import DatePicker from "react-native-datepicker"

export default function DateSelector({ render, setRender, date, setDate }) {
  return (
    <View>
      {render ? (
        <View>
          <DatePicker
            style={{ width: 300 }}
            date={date}
            mode='date'
            placeholder={date === "" ? "Select Date" : date}
            format='YYYY-MM-DD'
            minDate='1950-01-01'
            maxDate='2016-06-01'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              setDate(date)
            }}
          />

          <Text
            style={{
              color: "tomato",
              alignSelf: "center",
              margin: 10,
              padding: 5,
              fontWeight: "bold",
              borderBottomWidth: 1,
              borderBottomColor: "tomato",
            }}
            onPress={() => {
              setRender(false)
            }}
          >
            Close
          </Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  )
}

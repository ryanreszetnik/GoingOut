import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import moment from "moment"

export default function Notification({ notification }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.message}>
        {moment(notification.timestamp).format("MM/DD/YY, LT")}
      </Text>
      <Text style={styles.message}>{notification.message}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingLeft: 5,
    borderTopColor: "#AAA",
    borderTopWidth: 0.5,
    height: 50,
  },
  message: {
    fontSize: 16,
    color: "white",
  },
})

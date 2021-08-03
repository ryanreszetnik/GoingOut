import React from "react"
import { Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

export default function MatchPreview({ onPress, match }) {
  return (
    <TouchableOpacity onPress={() => onPress(match)} style={styles.container}>
      <Text>{`Name: ${match.otherEvent.name}`}</Text>
      <Text>{`Size: ${match.otherEvent.members.length}`}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#DDD",
  },
})

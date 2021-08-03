import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

export default function PotentialMatchPreview({ onPress, match }) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => onPress(match.eventId)}
        style={styles.container}
      >
        <Text>{`Name: ${match.name}`}</Text>
        <Text>{`Size: ${match.members.length}`}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minWidth: "44%",
    height: 200,
    borderRadius: 7,
    backgroundColor: "#FFF",
    padding: 8,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    marginHorizontal: "3%",
    marginTop: 10,
  },
})

import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function GroupPreview({ group }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{group.name}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    backgroundColor: "#DDD",
    height: 50,
  },
  header: {},
})

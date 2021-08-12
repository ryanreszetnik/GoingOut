import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function DisplayTextField({ label, icon, value }) {
  return (
    <View style={styles.txtField}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color="#AAA"
          style={styles.icon}
        />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.attributeTxt}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  txtField: {
    borderTopWidth: 0.5,
    borderColor: "#777",
    marginVertical: 5,
    paddingVertical: 5,
  },
  label: { color: "white" },
  icon: { paddingRight: 10 },
  attributeTxt: {
    fontSize: 20,
    paddingVertical: 2,
    marginVertical: 2,
    color: "white",
  },
})

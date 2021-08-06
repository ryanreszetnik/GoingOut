import React from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { RadioButton } from "react-native-paper"
import { ACCENT_COLOR, CONTAINER_COLOR } from "../Theme/theme.style"

export default function GenderPicker({ checked, setChecked }) {
  const button = (value) => {
    if (value === checked) {
      return (
        <TouchableOpacity style={styles.selectedOption}>
          <Text style={styles.optionText}>{value}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity style={styles.option} onPress={() => setChecked(value)}>
        <Text style={styles.optionText}>{value}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ width: "100%", paddingHorizontal: 10 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Matching Gender Preference</Text>
        <View style={styles.options}>
          {button("None")}
          {button("Male")}
          {button("Female")}
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: CONTAINER_COLOR,
    borderRadius: 10,
    width: "100%",
    marginVertical: 3,
    paddingHorizontal: 20,
    paddingBottom: 5,
    paddingTop: 5,
  },
  options: {
    flexDirection: "row",
  },
  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 5,
  },
  option: { padding: 10, width: "25%" },
  selectedOption: {
    backgroundColor: ACCENT_COLOR,
    padding: 10,
    width: "25%",
    borderRadius: 4,
  },
  optionText: {
    color: "white",
    textAlign: "center",
    borderRadius: 4,
  },
})

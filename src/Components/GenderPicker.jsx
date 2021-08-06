import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { RadioButton } from "react-native-paper"
import { PRIMARY_FONT } from "../Theme/theme.style"

export default function GenderPicker({ checked, setChecked }) {
  return (
    <View style={{ width: "50%", marginVertical: 20 }}>
      <Text style={styles.title}>Select Gender</Text>
      <View style={styles.container}>
        <RadioButton.Group style={styles.radioContainer}>
          <RadioButton.Item
            value="Male"
            label="Male"
            status={checked === "Male" ? "checked" : "unchecked"}
            onPress={() => setChecked("Male")}
            uncheckedColor="gray"
            color="white"
          />

          <RadioButton.Item
            value="Female"
            label="Female"
            status={checked === "Female" ? "checked" : "unchecked"}
            onPress={() => setChecked("Female")}
            uncheckedColor="gray"
            color="white"
          />

          <RadioButton.Item
            value="Other"
            label="Other"
            status={checked === "Other" ? "checked" : "unchecked"}
            onPress={() => setChecked("Other")}
            uncheckedColor="gray"
            color="white"
          />
        </RadioButton.Group>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 20,
    width: "90%",
    marginVertical: 10,
    paddingTop: 15,
  },
  radioContainer: {
    flexDirection: "row",
  },
  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 5,
    fontFamily: PRIMARY_FONT,
    textAlign: "center",
  },
})

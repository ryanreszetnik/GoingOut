import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { RadioButton } from "react-native-paper"

export default function GenderPicker({ checked, setChecked }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Gender</Text>
      <RadioButton.Group style={styles.radioContainer}>
        <RadioButton.Item
          value='Male'
          label='Male'
          status={checked === "Male" ? "checked" : "unchecked"}
          onPress={() => setChecked("Male")}
          uncheckedColor='gray'
          color='tomato'
        />

        <RadioButton.Item
          value='Female'
          label='Female'
          status={checked === "Female" ? "checked" : "unchecked"}
          onPress={() => setChecked("Female")}
          uncheckedColor='gray'
          color='tomato'
        />

        <RadioButton.Item
          value='Other'
          label='Other'
          status={checked === "Other" ? "checked" : "unchecked"}
          onPress={() => setChecked("Other")}
          uncheckedColor='gray'
          color='tomato'
        />
      </RadioButton.Group>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#e9e9e9",
    borderRadius: 20,
    width: "90%",
    marginVertical: 10,
    paddingTop: 15,
  },
  radioContainer: {
    flexDirection: "row",
  },
  title: {
    color: "#737373",
    fontSize: 20,
    marginBottom: 5,
  },
})

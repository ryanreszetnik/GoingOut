import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { RadioButton } from "react-native-paper"

export default function GenderPicker({ checked, setChecked }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Gender</Text>
      <RadioButton.Group style={styles.radioContainer}>
        <RadioButton.Item
          value='male'
          label='Male'
          status={checked === "male" ? "checked" : "unchecked"}
          onPress={() => setChecked("male")}
          uncheckedColor='gray'
          color='tomato'
        />

        <RadioButton.Item
          value='female'
          label='Female'
          status={checked === "female" ? "checked" : "unchecked"}
          onPress={() => setChecked("female")}
          uncheckedColor='gray'
          color='tomato'
        />

        <RadioButton.Item
          value='other'
          label='Other'
          status={checked === "other" ? "checked" : "unchecked"}
          onPress={() => setChecked("other")}
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

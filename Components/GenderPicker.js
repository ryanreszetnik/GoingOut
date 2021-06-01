import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { RadioButton } from "react-native-paper"

export default function GenderPicker({ checked, setChecked }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Gender</Text>
      <View style={styles.radioContainer}>
        <RadioButton
          value='male'
          status={checked === "male" ? "checked" : "unchecked"}
          onPress={() => setChecked("male")}
          uncheckedColor='gray'
          color='tomato'
        />
        <Text style={checked === "male" ? styles.labelOn : styles.labelOff}>
          Male
        </Text>
        <RadioButton
          value='female'
          status={checked === "female" ? "checked" : "unchecked"}
          onPress={() => setChecked("female")}
          uncheckedColor='gray'
          color='tomato'
        />
        <Text style={checked === "female" ? styles.labelOn : styles.labelOff}>
          Female
        </Text>
        <RadioButton
          value='other'
          status={checked === "other" ? "checked" : "unchecked"}
          onPress={() => setChecked("other")}
          uncheckedColor='gray'
          color='tomato'
        />
        <Text style={checked === "other" ? styles.labelOn : styles.labelOff}>
          Other
        </Text>
      </View>
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
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  labelOn: {
    textAlign: "center",
    color: "tomato",
    paddingRight: 20,
  },
  labelOff: {
    textAlign: "center",
    color: "gray",
    paddingRight: 20,
  },
  title: {
    color: "#737373",
    fontSize: 20,
    marginBottom: 5,
  },
})

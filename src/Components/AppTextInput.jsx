import React from "react"
import { View, StyleSheet, TextInput, Text } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ACCENT_COLOR, CONTAINER_COLOR } from "../Theme/theme.style"
export default function AppTextInput({ label = "", leftIcon, ...otherProps }) {
  return (
    <View style={styles.wholeContainer}>
      {label.length > 0 && <Text style={styles.label}>{label}</Text>}
      <View style={styles.container}>
        {leftIcon && (
          <MaterialCommunityIcons
            name={leftIcon}
            size={20}
            color="#6e6869"
            style={styles.icon}
          />
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor="gray"
          {...otherProps}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  wholeContainer: {
    backgroundColor: "green",
    backgroundColor: CONTAINER_COLOR,
    borderRadius: 5,
    padding: 8,
  },
  label: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    paddingBottom: 3,
  },
  container: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
    color: "gray",
  },
  input: {
    width: "80%",
    fontSize: 18,
    color: "white",
  },
})

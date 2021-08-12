import React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { CONTAINER_COLOR } from "../Theme/theme.style"

const categories = [
  "Any",
  "Nightlife",
  "Exercise",
  "Eating",
  "Study",
  // "Online",
  "Day Activity",
]

export default function CategorySelection({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen((o) => !o)
  }
  const selectCategory = (category) => {
    if (category === "Any") {
      onChange(null)
    } else {
      onChange(category)
    }
    setOpen(false)
  }

  const categoryPreview = (category) => {
    return (
      <TouchableOpacity
        onPress={() => selectCategory(category)}
        key={category}
        style={styles.option}
      >
        <Text style={styles.optionText}>{category}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.wholeContainer}>
      <TouchableOpacity onPress={toggleOpen} style={styles.dropdownButton}>
        <Text style={styles.headerTitle}>Category</Text>
        <View style={styles.rightContainer}>
          <Text style={styles.headerValue}>
            {value !== null ? value : "Any"}
          </Text>
        </View>
      </TouchableOpacity>
      {open &&
        categories.map((cat) => {
          return categoryPreview(cat)
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  wholeContainer: {
    paddingTop: 3,
  },
  dropdownButton: {
    backgroundColor: CONTAINER_COLOR,
    display: "flex",
    height: 40,
    alignItems: "center",
    flexDirection: "row",
  },
  headerTitle: {
    color: "white",
    paddingLeft: 15,
    fontSize: 16,
    fontWeight: "600",
  },
  rightContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "flex-end",
  },
  headerValue: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    paddingRight: 10,
  },
  option: {
    width: "100%",
    height: 40,
    backgroundColor: "#777",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  optionText: {
    textAlign: "center",
    color: "white",
    paddingTop: 10,
    fontWeight: "400",
    fontSize: 16,
  },
})

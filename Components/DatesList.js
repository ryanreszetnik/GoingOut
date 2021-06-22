import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

export default function DatesList({ dates, onPress, onDelete, curDates }) {
  const datePreview = (date) => {
    return (
      <View key={date}>
        <TouchableOpacity
          style={styles.container}
          key={date}
          onPress={() => onPress(date)}
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>{date}</Text>
          </View>
        </TouchableOpacity>
        {!curDates.includes(date) && (
          <FontAwesome5
            name='times'
            color='red'
            onPress={() => onDelete(date)}
            style={styles.icon}
          />
        )}
      </View>
    )
  }

  return (
    <View style={styles.componentContainer}>
      {dates.sort().map((date) => datePreview(date))}
    </View>
  )
}

const styles = StyleSheet.create({
  componentContainer: {},
  icon: {
    position: "absolute",
    right: 10,
    backgroundColor: "gray",
    height: "100%",
    width: 30,
    paddingLeft: 10,
    paddingVertical: 20,
  },
  container: {
    height: 60,
    backgroundColor: "#DDD",
    flexDirection: "row",
    width: "100%",
  },
  text: {
    fontWeight: "500",
    fontSize: 20,
  },
  photo: {
    backgroundColor: "#EEE",
    width: 60,
    height: 60,
  },
  textContainer: {
    height: 60,
    padding: 8,
  },
  subtext: {
    fontWeight: "300",
    fontSize: 14,
    paddingTop: 3,
  },
})

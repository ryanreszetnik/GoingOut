import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import { SET_CUR_GROUP } from "../src/Actions/groupActions"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

export default function GroupPreview({ group, onPress, id }) {
  

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.header}>{group.name}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#DDD",
    height: 50,
  },
})

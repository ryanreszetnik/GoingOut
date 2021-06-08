import React from "react"
import { Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import { SET_CUR_GROUP } from "../src/Actions/groupActions"

export default function GroupPreview({ group, onPress, id }) {
  const dispatch = useDispatch()
  const onSelect = () => {
    dispatch({ type: SET_CUR_GROUP, payload: id })
    onPress()
  }
  return (
    <TouchableOpacity onPress={onSelect} style={styles.container}>
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
  header: {},
})

import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import { SET_CUR_TEMP_GROUP } from "../src/Actions/groupActions"

export default function TempGroupPreview({ group, onPress, id }) {
  const dispatch = useDispatch()
  const onSelect = () => {
    dispatch({ type: SET_CUR_TEMP_GROUP, payload: id })
    onPress()
  }
  const baseGroups = group.baseGroups.map((id) =>
    useSelector((state) => state.groups.permGroups).find(
      (group) => group.groupId === id
    )
  )
  return (
    <TouchableOpacity onPress={onSelect} style={styles.container}>
      <Text style={styles.header}>{group.name}</Text>
      <Text>Date: {group.date}</Text>
      <Text>Time: {group.time}</Text>
      <Text>
        {`Groups:  `}
        {baseGroups &&
          baseGroups.map((group) => {
            return <Text key={group.groupId}>{group.name}</Text>
          })}
      </Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#DDD",
  },
})

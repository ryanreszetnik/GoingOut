import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import { SET_CUR_GROUP } from "../src/Actions/groupActions"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

export default function GroupPreview({ group, onPress, id, onDelete }) {
  const dispatch = useDispatch()
  const onSelect = () => {
    dispatch({ type: SET_CUR_GROUP, payload: id })
    onPress()
  }

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={onSelect} style={styles.container}>
        <Text style={styles.header}>{group.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onDelete(id)}
        style={styles.iconContainer}
      >
        <FontAwesome5
          name='sign-out-alt'
          color='white'
          size={20}
          style={{ marginTop: "20%" }}
        />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#DDD",
    height: 50,
    width: 350,
  },
  header: { alignSelf: "center", padding: 20 },
  iconContainer: {
    alignItems: "center",
    width: 60,
    backgroundColor: "darkred",
    borderColor: "black",
    height: 50,
    borderStyle: "solid",
    borderWidth: 1,
  },
})

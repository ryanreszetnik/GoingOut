import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import { SET_CUR_GROUP } from "../src/Actions/groupActions"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import theme from "../src/Styles/theme.style"
import GroupImage from "./GroupImage"

export default function GroupPreview({ group, onPress }) {
  const chats = useSelector((state) =>
    state.chats.find((c) => c.groupId === group.groupId)
  )
  const lastMessage = chats ? chats.lastmessage : null
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <GroupImage photoIds={group.members} size={70} />
      <View style={styles.textContainer}>
        <Text style={styles.header}>{group.name}</Text>
        {lastMessage && <Text style={styles.message}>{lastMessage}</Text>}
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  textContainer: {
    paddingLeft: 10,
  },
  container: {
    flexDirection: "row",
    borderStyle: "solid",
    padding: 5,
    borderColor: theme.LIST_ITEM_BORDER_COLOR,
    backgroundColor: theme.LIST_ITEM_COLOR,
    height: 80,
  },
  header: { fontSize: 20, fontWeight: "600" },
  message: { fontSize: 15, paddingTop: 3, color: "#444" },
})

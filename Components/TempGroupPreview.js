import moment from "moment"
import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import theme from "../src/Styles/theme.style"
import GroupImage from "./GroupImage"
import Ionicon from "react-native-vector-icons/Ionicons"

export default function TempGroupPreview({ group, onPress }) {
  const baseGroups = !group
    ? null
    : group.baseGroups
        .map((id) => {
          let gr = [
            ...useSelector((state) => state.permGroups),
            ...useSelector((state) => state.tempGroups),
          ].find((group) => group.groupId === id)
          if (!group) {
            gr = useSelector((state) => state.tempGroups).find(
              (group) => group.groupId === id
            )
          }
          return gr
        })
        .filter((gr) => gr !== undefined)

  // const baseGroups = []
  return (
    <View>
      {baseGroups ? (
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <GroupImage photoIds={group.members} size={70} />
          <View>
            <Text style={styles.header}>{group.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Ionicon name="calendar-outline" size={15} />

              <Text style={{ paddingLeft: 5 }}>
                {`${moment(`${group.date}`).calendar().split(" at")[0]} ${
                  group.time === "Not Set" ? "" : `at ${group.time}`
                }`}
              </Text>
            </View>

            {baseGroups.length > 0 && (
              <View style={{ flexDirection: "row" }}>
                <Ionicon name="chatbubbles-outline" size={15} />
                <Text style={{ paddingLeft: 5 }}>
                  {baseGroups.map((bg) => bg.name).join(", ")}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <Text>Group Not Found</Text>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 80,
    padding: 5,
    flexDirection: "row",
    borderColor: theme.LIST_ITEM_BORDER_COLOR,
    backgroundColor: theme.LIST_ITEM_COLOR,
  },
  header: {
    fontSize: 21,
    fontWeight: "600",
  },
})

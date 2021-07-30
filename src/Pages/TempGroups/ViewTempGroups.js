import React from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "react-native-gesture-handler"
import { batch, useDispatch, useSelector } from "react-redux"
import TempGroupPreview from "../../../Components/TempGroupPreview"
import { SET_CUR_TEMP_GROUP } from "../../Actions/groupActions"
import { PAGE_BACKGROUND_COLOR } from "../../Styles/theme.style"

export default function ViewTempGroups({ navigation }) {
  const groups = useSelector((state) =>
    state.tempGroups.sort(function (a, b) {
      return `${a.date}T${a.time}` < `${b.date}T${b.time}`
    })
  )
  const baseGroups = groups.filter((gr) => {
    return gr.tempGroups.length > 0
  })
  const masterGroups = groups.filter((gr) => !baseGroups.includes(gr))

  const dispatch = useDispatch()
  const moveToView = (id) => {
    batch(() => {
      dispatch({ type: SET_CUR_TEMP_GROUP, payload: id })
    })

    navigation.navigate("View Single Temp Group")
  }

  return (
    <ScrollView style={{ backgroundColor: PAGE_BACKGROUND_COLOR }}>
      {baseGroups.length > 0 && <Text>Master Groups</Text>}
      {masterGroups.map((group) => {
        return (
          <TempGroupPreview
            group={group}
            key={group.groupId}
            onPress={() => moveToView(group.groupId)}
            id={group.groupId}
          />
        )
      })}
      {baseGroups.length > 0 && <Text>Sub Groups</Text>}
      {baseGroups.map((group) => {
        return (
          <TempGroupPreview
            group={group}
            key={group.groupId}
            onPress={() => moveToView(group.groupId)}
            id={group.groupId}
          />
        )
      })}
    </ScrollView>
  )
}

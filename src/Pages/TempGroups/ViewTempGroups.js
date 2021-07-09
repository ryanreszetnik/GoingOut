import React from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "react-native-gesture-handler"
import { batch, useDispatch, useSelector } from "react-redux"
import TempGroupPreview from "../../../Components/TempGroupPreview"
import {
  SET_CUR_TEMP_GROUP,
} from "../../Actions/groupActions"

export default function ViewTempGroups({ navigation }) {
  const groups = useSelector((state) => state.tempGroups)
  const dispatch = useDispatch()
  const moveToView = (id) => {
    batch(() => {
      dispatch({ type: SET_CUR_TEMP_GROUP, payload: id })
    })

    navigation.navigate("View Single Temp Group")
  }

  return (
    <ScrollView>
      {groups.map((group) => {
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

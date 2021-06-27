import React from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"

export default function ViewTempGroups() {
  const groups = useSelector((state) => state.groups.tempGroups)
  const dispatch = useDispatch()
  const moveToView = (id) => {
    dispatch({ type: SET_CUR_BASE_GROUP, payload: id })
    navigation.navigate("Matches")
  }
  return (
    <ScrollView>
      {groups.map((group) => {
        return (
          <GroupPreview
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

import React, { useEffect } from "react"
import { View, Text, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import GroupPreview from "../../../Components/GroupPreview"

export default function ViewPermGroups({ navigation }) {
  const groups = useSelector((state) => state.groups.permGroups)
  const dispatch = useDispatch()
  const moveToView = () => {
    navigation.navigate("Chat")
  }
  return (
    <View>
      {groups.map((group) => {
        return (
          <GroupPreview
            group={group}
            key={group.groupId}
            onPress={moveToView}
            id={group.groupId}
          />
        )
      })}
    </View>
  )
}

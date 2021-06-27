import React, { useEffect } from "react"
import { View, Text, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import GroupPreview from "../../../Components/GroupPreview"

export default function Matches({ navigation }) {
  const groups = useSelector((state) => state.groups.matches)
  const moveToView = () => {
    navigation.navigate("Chat View")
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

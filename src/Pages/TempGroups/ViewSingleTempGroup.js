import React from "react"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"

export default function ViewSingleTempGroup() {
  const curGroup = useSelector((state) => state.groups.curTempGroup)
  const event = useSelector((state) =>
    state.groups.tempGroups.find((group) => group.groupId === curGroup)
  )
  return (
    <View>
      <Text></Text>
    </View>
  )
}

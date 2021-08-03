import React from "react"
import { ScrollView } from "react-native"
import { useSelector } from "react-redux"
import GroupPreview from "../../Components/GroupPreview"
import { GROUPS_CHAT } from "../../Constants/screens"

export default function ViewGroups({ navigation }) {
  const groups = useSelector((state) => state.groups)
  const moveToView = (id) => {
    navigation.navigate(GROUPS_CHAT, { groupId: id })
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
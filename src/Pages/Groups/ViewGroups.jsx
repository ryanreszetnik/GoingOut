import React from "react"
import { ScrollView } from "react-native"
import { useSelector } from "react-redux"
import GroupPreview from "../../Components/GroupPreview"
import { GROUPS_CHAT } from "../../Constants/screens"
import { PAGE_BACKGROUND_COLOR } from "../../Theme/theme.style"

export default function ViewGroups({ navigation }) {
  const groups = useSelector((state) => state.groups)
  const moveToView = (id) => {
    navigation.navigate(GROUPS_CHAT, { groupId: id })
  }
  return (
    <ScrollView style={{ backgroundColor: PAGE_BACKGROUND_COLOR }}>
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

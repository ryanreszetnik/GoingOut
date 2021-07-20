import React, { useEffect } from "react"
import { View, Text, Button, ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import AppButton from "../../../Components/AppButton"
import GroupPreview from "../../../Components/GroupPreview"
import { SET_CUR_PERM_GROUP } from "../../Actions/groupActions"

export default function ViewPermGroups({ navigation }) {
  const groups = useSelector((state) => state.permGroups)
  const dispatch = useDispatch()
  const moveToView = (id) => {
    dispatch({ type: SET_CUR_PERM_GROUP, payload: id })
    navigation.navigate("Chat View")
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

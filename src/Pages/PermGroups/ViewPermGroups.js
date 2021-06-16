import React, { useEffect } from "react"
import { View, Text, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import AppButton from "../../../Components/AppButton"
import GroupPreview from "../../../Components/GroupPreview"

export default function ViewPermGroups({ navigation }) {
  const groups = useSelector((state) => state.groups.permGroups)
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
      <AppButton
        title='Matches!'
        onPress={() => navigation.navigate("Matches")}
      />
    </View>
  )
}

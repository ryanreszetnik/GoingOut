import React, { useState } from "react"
import { View, Text } from "react-native"
import { useDispatch, useSelector, useEffect } from "react-redux"
import AppButton from "../../../../Components/AppButton"
import GroupPreview from "../../../../Components/GroupPreview"
import MonthPicker from "../../../../Components/MonthPicker"
import {
  SET_CUR_GROUP,
  SET_CUR_GROUP_PREVIEW,
  SET_FOUND_MATCHES,
  SET_MATCHES,
} from "../../../Actions/groupActions"
import { getPotentialMatches } from "../../../Endpoints/matchingEndpoints"
import { searchMatches } from "../../../Endpoints/tempGroupsEndpoints"

export default function AddMatches({ navigation }) {
  const dispatch = useDispatch()
  const groups = useSelector((state) => state.potentialMatches.foundMatches)
  const date = useSelector((state) => state.potentialMatches.date)
  const moveToView = (groupId) => {
    dispatch({ type: SET_CUR_GROUP, payload: groupId })
    navigation.navigate("View Single Match")
  }
  const curBaseGroup = useSelector((state) => state.groups.curBasegroup)

  useEffect(async () => {
    dispatch({
      type: SET_MATCHES,
      payload: await searchMatches(curBaseGroup),
    })
  }, [])

  return (
    <View>
      <Text>{`Matches for ${date}`}</Text>
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
    </View>
  )
}

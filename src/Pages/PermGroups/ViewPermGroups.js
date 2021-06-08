import React, { useEffect } from "react"
import { View, Text, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import FriendSearch from "../Profile/FriendSearch"
import GroupPreview from "../../../Components/GroupPreview"
import { SET_CUR_GROUP, SET_PERM_GROUPS } from "../../Actions/groupActions"
import { getPermGroups } from "../../Endpoints/permGroupsEndpoints"

export default function ViewPermGroups({ navigation }) {
  const dispatch = useDispatch()
  const moveToView = () => {
    navigation.navigate("View Single Group")
  }

  useEffect(() => {
    dispatch({ type: SET_PERM_GROUPS, payload: await getPermGroups() })
  }, [])

  const groups = useSelector((state) => state.groups.permGroups)
  return (
    <View>
      {groups.map((group) => {
        return (
          <GroupPreview
            group={group}
            key={group.id}
            onPress={moveToView}
            id={group.id}
          />
        )
      })}
    </View>
  )
}

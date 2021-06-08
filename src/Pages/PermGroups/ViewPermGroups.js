import React, { useEffect } from "react"
import { View, Text, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import FriendSearch from "../Profile/FriendSearch"
import GroupPreview from "../../../Components/GroupPreview"
import {
  REMOVE_PERM_GROUP,
  SET_CUR_GROUP,
  SET_PERM_GROUPS,
} from "../../Actions/groupActions"
import { getPermGroups } from "../../Endpoints/permGroupsEndpoints"
import { SET_USER_GROUPS } from "../../Actions/authActions"
import { deleteGroup } from "../../Endpoints/groupEndpoints"

export default function ViewPermGroups({ navigation }) {
  const groups = useSelector((state) => state.groups.permGroups)
  const dispatch = useDispatch()
  const moveToView = () => {
    navigation.navigate("View Single Group")
  }
  const onDelete = async (groupId) => {
    console.log(await deleteGroup(groupId))
    dispatch({ type: REMOVE_PERM_GROUP, payload: groupId })
    dispatch({
      type: SET_USER_GROUPS,
      payload: groups.map((group) => group.groupId),
    })
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
            onDelete={onDelete}
          />
        )
      })}
    </View>
  )
}

import React, { useEffect, useState } from "react"
import { View, Text, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import GroupPreview from "../../../../Components/GroupPreview"
import { SET_MATCHES } from "../../../Actions/groupActions"
import { searchMatches } from "../../../Endpoints/tempGroupsEndpoints"

export default function Matches({ navigation }) {
  const dispatch = useDispatch()
  const moveToView = () => {
    navigation.navigate("Chat View")
  }
  const [matches, setMatches] = useState(
    useSelector((state) => state.groups.matches)
  )
  const curBaseGroup = useSelector((state) => state.groups.curBaseGroup)

  useEffect(() => {
    const loadMatches = async () => {
      setMatches(matches === [] ? await searchMatches(curBaseGroup) : matches)
      dispatch({ type: SET_MATCHES, payload: matches })
      console.log(await searchMatches(curBaseGroup))
    }

    loadMatches()
  }, [])

  return (
    <View>
      {matches.map((group) => {
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

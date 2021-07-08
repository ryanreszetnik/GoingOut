import React, { useEffect, useState } from "react"
import { View, Text, Button, ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import GroupPreview from "../../../../Components/GroupPreview"
import { SET_MATCHES } from "../../../Actions/groupActions"
import { searchMatches } from "../../../Endpoints/tempGroupsEndpoints"

export default function Matches({ navigation }) {
  const dispatch = useDispatch()
  const moveToView = () => {
    navigation.navigate("View Single Match")
  }
  const [matches, setMatches] = useState(
    useSelector((state) => state.groups.matches)
  )
  const curBaseGroup = useSelector((state) => state.groups.curBaseGroup)

  useEffect(() => {
    const loadMatches = async () => {
      setMatches(
        matches.length === 0 ? await searchMatches(curBaseGroup) : matches
      )
      dispatch({ type: SET_MATCHES, payload: matches })
    }
    loadMatches()
  }, [])

  return (
    <View>
      {matches.length === 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size='large' color='tomato' />
        </View>
      ) : (
        matches.map((group) => {
          return (
            <GroupPreview
              group={group}
              key={group.groupId}
              onPress={moveToView}
              id={group.groupId}
            />
          )
        })
      )}
    </View>
  )
}

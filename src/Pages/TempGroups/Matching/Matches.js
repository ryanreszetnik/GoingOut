import React, { useEffect, useState } from "react"
import { View, Text, Button, ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import TempGroupPreview from "../../../../Components/TempGroupPreview"
import {
  SET_CUR_TEMP_GROUP,
  SET_FOUND_MATCHES,
} from "../../../Actions/groupActions"
import { searchMatches } from "../../../Endpoints/tempGroupsEndpoints"

export default function Matches({ navigation }) {
  const dispatch = useDispatch()
  const moveToView = (id) => {
    dispatch({ type: SET_CUR_TEMP_GROUP, payload: id })
    navigation.navigate("View Single Match")
  }
  const [matches, setMatches] = useState(
    useSelector((state) => state.groups.foundMatches)
  )
  const curBaseGroup = useSelector((state) => state.groups.curBaseGroup)

  useEffect(() => {
    const loadMatches = async () => {
      setMatches(
        matches.length === 0 ? await searchMatches(curBaseGroup) : matches
      )
      dispatch({ type: SET_FOUND_MATCHES, payload: matches })
    }
    loadMatches()
  }, [])
  console.log(matches)
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
            <TempGroupPreview
              group={group}
              key={group.groupId}
              onPress={() => moveToView(group.groupId)}
              id={group.groupId}
            />
          )
        })
      )}
    </View>
  )
}

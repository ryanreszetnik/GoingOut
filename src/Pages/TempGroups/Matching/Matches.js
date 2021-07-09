import React, { useEffect, useState } from "react"
import { View, Text, Button, ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import TempGroupPreview from "../../../../Components/TempGroupPreview"
import {
  SET_CUR_FOUND_MATCH,
  SET_CUR_TEMP_GROUP,
  SET_FOUND_MATCHES,
} from "../../../Actions/groupActions"
import { searchMatches } from "../../../Endpoints/tempGroupsEndpoints"

export default function Matches({ navigation }) {
  const dispatch = useDispatch()
  const moveToView = (id) => {
    dispatch({ type: SET_CUR_FOUND_MATCH, payload: id })
    navigation.navigate("View Single Potential Match")
  }
  const matches= useSelector((state) => state.foundMatches)
  
  const curBaseGroup = useSelector((state) => state.current.tempGroup)

  useEffect(() => {
    const loadMatches = async () => {
      dispatch({
        type: SET_FOUND_MATCHES,
        payload: await searchMatches(curBaseGroup),
      });
    };
    loadMatches();
  }, [curBaseGroup]);

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

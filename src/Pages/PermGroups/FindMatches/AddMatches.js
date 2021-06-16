import React, { useState } from "react"
import { View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import AppButton from "../../../../Components/AppButton"
import GroupPreview from "../../../../Components/GroupPreview"
import MonthPicker from "../../../../Components/MonthPicker"
import { SET_FOUND_MATCHES } from "../../../Actions/groupActions"

export default function AddMatches({ navigation }) {
  const dispatch = useDispatch()
  const [groups, setGroups] = useState([]) //Matches based on date input
  const [date, setDate] = useState("")
  const [selected, setSelected] = useState(false)
  const moveToView = () => {
    navigation.navigate("View Single Match")
  }
  const updateDate = (day) => {
    setDate(day)
    setSelected(true)
    //setGroups(api request thingy with date input)
    //payload;
    //dispatch({ type: SET_FOUND_MATCHES, payload })
  }
  return (
    <View>
      {!selected ? (
        <MonthPicker initialDate={date} updateDate={updateDate} />
      ) : (
        <View>
          <Text>{`Matches for ${date}`}</Text>
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
          <AppButton title='Change Date' onPress={() => setSelected(false)} />
        </View>
      )}
    </View>
  )
}

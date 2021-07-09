import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"

export default function TempGroupPreview({ group, onPress, id }) {
  const baseGroups = group.baseGroups.map((id) =>{
    let gr = useSelector((state) => state.permGroups).find(
      (group) => group.groupId === id
    )
    if(!group){
      gr = useSelector((state) => state.tempGroups).find(
      (group) => group.groupId === id
    )}
    return gr;
    }
  ).filter(gr=>gr!==undefined)
  
 // const baseGroups = []
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.header}>{group.name}</Text>
      <Text>Date: {group.date}</Text>
      <Text>Time: {group.time}</Text>
      {baseGroups.length>0&&
      <Text>
        {`Groups:  `}
        {baseGroups.map((group) => {
          return <Text key={group.groupId}>{group.name}</Text>
        })}
      </Text>}
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#DDD",
  },
})

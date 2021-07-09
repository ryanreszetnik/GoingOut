import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from 'react-redux';


export default function MatchPreview({ onPress, match }) {
  
  return (
    <TouchableOpacity onPress={()=>onPress(match)} style={styles.container}>
      <Text>{`Name: ${match.otherGroup.name}`}</Text>
      <Text>{`Size: ${match.otherGroup.members.length}`}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#DDD",
  },
})
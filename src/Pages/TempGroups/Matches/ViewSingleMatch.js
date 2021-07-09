import React, { useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import AppButton from "../../../../Components/AppButton"
import { useDispatch, useSelector } from "react-redux"
import uuid from "react-native-uuid"
import { ADD_MATCH, SET_CUR_TEMP_GROUP } from "../../../Actions/groupActions"
import { matchWithGroup } from "../../../Socket/SocketMethods"

export default function ViewSingleMatch({ navigation }) {
  const dispatch = useDispatch()
  const groupId = useSelector((state) => state.current.tempGroup)
  const matchId = useSelector((state) => state.current.match)
  
  const match = useSelector((state) => state.matches.find(ma=>ma.matchId===matchId))

  const onPress = () => {
    console.log("Going to existing match")
    navigation.navigate("Match Chat View")
  }
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
           <Text>Match</Text>
        <AppButton
          title={"Chat"}
          onPress={onPress}
        />
        <Text>{match.otherGroup.groupId}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
  },
  img: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    marginLeft: "10%",
  },
  imageFriends: {
    flexDirection: "row",
  },
  imgText: {
    backgroundColor: "#c0c0c0",
    padding: 5,
    marginLeft: "30%",
    borderRadius: 5,
    alignSelf: "center",
  },
  imgTitle: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 15,
  },
  attributeContainer: {
    marginVertical: 10,
  },
  txtField: {
    borderTopWidth: 0.5,
    marginVertical: 5,
    paddingVertical: 5,
  },

  attributeTxt: {
    fontSize: 20,
    paddingVertical: 2,
    marginVertical: 2,
  },
})

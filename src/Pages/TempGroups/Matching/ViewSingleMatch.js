import React from "react"
import { View, Text, StyleSheet } from "react-native"
import AppButton from "../../../../Components/AppButton"

export default function ViewSingleMatch({ navigation }) {
  const onPress = () => {
    navigation.navigate("Match Chat View")
  }
  return (
    <View style={styles.container}>
      <Text></Text>
      <View style={{ alignItems: "center" }}>
        <AppButton title='Start Chatting' onPress={onPress}></AppButton>
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

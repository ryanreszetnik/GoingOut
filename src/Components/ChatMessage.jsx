import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { ACCENT_COLOR, PAGE_BACKGROUND_COLOR } from "../Theme/theme.style"

export default function ChatMessage({ message, sender, author }) {
  if (sender) {
    //change as per your code logic

    return (
      <View
        style={{
          backgroundColor: ACCENT_COLOR,
          padding: 10,
          marginLeft: "45%",
          borderRadius: 5,

          marginTop: 5,
          marginRight: "5%",
          maxWidth: "50%",
          alignSelf: "flex-end",
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: "#fff" }}>{message}</Text>

        <View style={styles.rightArrow}></View>
        <View style={styles.rightArrowOverlap}></View>
      </View>
    )
  } else {
    return (
      <View>
        <Text
          style={{
            fontSize: 12,
            color: "white",
            justifyContent: "flex-start",
            paddingLeft: 25,
          }}
        >
          {author}
        </Text>

        <View
          style={{
            backgroundColor: "gray",
            padding: 10,
            borderRadius: 5,
            marginTop: 5,
            marginLeft: "5%",
            maxWidth: "50%",
            alignSelf: "flex-start",
            //maxWidth: 500,
            //padding: 14,

            //alignItems:"center",
            borderRadius: 20,
          }}
        >
          <Text
            style={{ fontSize: 16, color: "white", justifyContent: "center" }}
          >
            {message}
          </Text>

          <View style={styles.leftArrow}></View>
          <View style={styles.leftArrowOverlap}></View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  rightArrow: {
    position: "absolute",
    backgroundColor: ACCENT_COLOR,
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },

  rightArrowOverlap: {
    position: "absolute",
    backgroundColor: PAGE_BACKGROUND_COLOR,
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },

  /*Arrow head for recevied messages*/
  leftArrow: {
    position: "absolute",
    backgroundColor: "gray",
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10,
  },

  leftArrowOverlap: {
    position: "absolute",
    backgroundColor: PAGE_BACKGROUND_COLOR,
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20,
  },
})

import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { defaultImg, getImageURIBySub } from "../src/aws-exports"
import { REQUEST, REQUESTED, CONFIRMED } from "../src/Constants/friendConstants"
import theme from "../src/Styles/theme.style"

export default function UserList({ users, onPress, imgSources }) {
  const statusPreview = (status) => {
    switch (status) {
      case REQUEST:
        return "- Incoming Request"
      case REQUESTED:
        return "- Requested"
      case CONFIRMED:
        return "- Friends"
      default:
        return ""
    }
  }

  const userPreview = (user) => {
    return (
      <TouchableOpacity
        style={styles.container}
        key={user.sub}
        onPress={() => onPress(user)}
      >
        <Image
          style={styles.photo}
          source={
            imgSources !== undefined
              ? imgSources[users.indexOf(user)]
              : defaultImg
          }
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{user.username}</Text>
          <Text style={styles.subtext}>{`${user.name}${statusPreview(
            user.status
          )}`}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.componentContainer}>
      {users.map((user) => userPreview(user))}
    </View>
  )
}
const styles = StyleSheet.create({
  componentContainer: {},
  container: {
    height: 60,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.LIST_ITEM_BORDER_COLOR,
    backgroundColor: theme.LIST_ITEM_COLOR,
    flexDirection: "row",
  },
  text: {
    fontWeight: "500",
    fontSize: 20,
  },
  photo: {
    backgroundColor: "#EEE",
    width: 60,
    height: 60,
  },
  textContainer: {
    height: 60,
    padding: 8,
  },
  subtext: {
    fontWeight: "300",
    fontSize: 14,
    paddingTop: 3,
  },
})

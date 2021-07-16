import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native"
import { useSelector } from "react-redux"
import { defaultImg, getImageURIBySub } from "../src/aws-exports"
import { REQUEST, REQUESTED, CONFIRMED } from "../src/Constants/friendConstants"
import theme from "../src/Styles/theme.style"

export default function UserList({ users, onPress }) {
  const [imgSources, setImgSources] = useState([])
  const profilePhoto = useSelector((state) => state.profile.photo)
  const getImgSources = async () => {
    const promises = users.map(async (user) => {
      return await getImageURIBySub(user.sub)
    })
    setImgSources(await Promise.all(promises))
  }
  useEffect(() => {
    getImgSources()
  }, [users, profilePhoto])

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
    <ScrollView style={styles.componentContainer}>
      {users.map((user) => userPreview(user))}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  componentContainer: {},
  container: {
    height: 70,
    borderColor: theme.LIST_ITEM_BORDER_COLOR,
    backgroundColor: theme.LIST_ITEM_COLOR,
    flexDirection: "row",
    paddingTop: 5,
  },
  text: {
    fontWeight: "500",
    fontSize: 20,
  },
  photo: {
    backgroundColor: "#EEE",
    width: 60,
    height: 60,
    borderRadius: 60,
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

import React, { useState, useEffect, Fragment } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native"
import { useSelector } from "react-redux"
import defaultImg from "../../Assets/default-profile-pic.jpg"
import { getImageURIBySub } from "../Utils/aws.utils"
import { REQUEST, REQUESTED, CONFIRMED } from "../Constants/constants"
import theme from "../Theme/theme.style"
import { ensureProfilesLoaded } from "../Utils/profiles.utils"

export default function UserList({
  subs,
  onPress,
  priority = 0,
  showFriendships = false,
  filterTerm = "",
  horizontal = false,
}) {
  const [imgSources, setImgSources] = useState([])
  const signedInProfile = useSelector((state) => state.profile)
  const friends = useSelector((state) => state.friends)
  const profilePhoto = useSelector((state) => state.profile.photo)
  const loadedProfiles = useSelector((state) => state.loadedProfiles)
  useEffect(() => {
    ensureProfilesLoaded(subs, priority)
  }, [subs])
  const getImgSources = async () => {
    const promises = subs.map(async (sub) => {
      return { ...(await getImageURIBySub(sub)), sub }
    })
    setImgSources(await Promise.all(promises))
  }
  useEffect(() => {
    getImgSources()
  }, [subs, profilePhoto])

  const statusPreview = (sub) => {
    const friend = friends.find((f) => f.sub === sub)
    if (!friend || !showFriendships) {
      return ""
    }
    const status = friend.status
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
  const filter = (user, term) => {
    return !(user.username.includes(term) || user.name.includes(term))
  }

  const userPreview = (sub) => {
    let user = loadedProfiles.find((l) => l.sub === sub)
    if (sub === signedInProfile.sub) {
      user = signedInProfile
    }
    if (filterTerm.length > 0 && filter(user, filterTerm)) {
      return <Fragment />
    }
    const imgSource = imgSources.find((s) => s.sub === sub)
    return (
      <TouchableOpacity
        style={horizontal ? styles.containerHorizontal : styles.container}
        key={sub}
        onPress={() => onPress(sub)}
      >
        <Image
          style={styles.photo}
          source={imgSource}
          defaultSource={defaultImg}
        />
        <View style={styles.textContainer}>
          <Text style={horizontal ? styles.textHorizontal : styles.text}>
            {user ? user.username : ""}
          </Text>
          {!horizontal && (
            <Text style={styles.subtext}>
              {user ? `${user.name} ${statusPreview(sub)}` : ""}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView
      horizontal={horizontal}
      style={
        horizontal
          ? styles.componentContainerHorizontal
          : styles.componentContainer
      }
    >
      {subs.map((sub) => {
        return userPreview(sub)
      })}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  componentContainer: {},
  componentContainerHorizontal: {
    height: 100,
    flexDirection: "row",
  },
  container: {
    height: 70,
    borderColor: theme.LIST_ITEM_BORDER_COLOR,
    backgroundColor: theme.LIST_ITEM_COLOR,
    flexDirection: "row",
    paddingTop: 5,
  },
  containerHorizontal: {
    height: 70,
    width: 80,
    alignItems: "center",
    borderColor: theme.LIST_ITEM_BORDER_COLOR,
    flexDirection: "column",
    paddingTop: 5,
  },
  text: {
    fontWeight: "500",
    fontSize: 20,
  },
  textHorizontal: {
    fontWeight: "300",
    fontSize: 14,
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

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
import {
  LIST_ITEM_BORDER_COLOR,
  LIST_ITEM_COLOR,
  PRIMARY_FONT,
} from "../Theme/theme.style"
import { ensureProfilesLoaded } from "../Utils/profiles.utils"

export default function UserList({
  subs,
  onPress,
  priority = 0,
  showFriendships = false,
  filterTerm = "",
  horizontal = false,
  addMember = false,
  removeIcon = false,
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
  const addButton = () => {
    return (
      <TouchableOpacity
        style={styles.containerHorizontal}
        key="AddMember"
        onPress={addMember}
      >
        <View style={styles.photo}>
          <Text
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              bottom: 11,
              color: "white",
              fontSize: 60,
              textAlign: "center",
            }}
          >
            {"+"}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textHorizontal}>Add Member</Text>
        </View>
      </TouchableOpacity>
    )
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
        {removeIcon && sub !== signedInProfile.sub && (
          <View
            style={{
              width: "100%",
              height: 20,
              position: "absolute",
              alignSelf: "baseline",
            }}
          >
            <View
              style={{
                alignSelf: "flex-end",
                width: 25,
                height: 25,
                borderRadius: 25,
                paddingLeft: 6,

                backgroundColor: "rgba(100,100,100,0.9)",
              }}
            >
              <Text
                style={{
                  color: "white",
                  position: "relative",
                  top: -2,
                  left: 1,
                  fontSize: 25,
                  transform: [{ rotate: "45deg" }],
                  fontWeight: "600",
                }}
              >
                +
              </Text>
            </View>
          </View>
        )}
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
      {addMember && horizontal && addButton()}
      {subs.map((sub) => {
        return userPreview(sub)
      })}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  componentContainer: {},
  componentContainerHorizontal: {
    height: 110,
    paddingTop: 5,
    alignContent: "center",
  },
  container: {
    height: 70,
    borderColor: LIST_ITEM_BORDER_COLOR,
    backgroundColor: LIST_ITEM_COLOR,
    flexDirection: "row",
    paddingTop: 5,
    borderRadius: 10,
    marginVertical: 2,
    elevation: 10,
  },
  containerHorizontal: {
    height: 70,
    width: 80,
    alignItems: "center",
    borderColor: LIST_ITEM_BORDER_COLOR,
    flexDirection: "column",
    paddingTop: 5,
    borderRadius: 10,
  },
  text: {
    fontWeight: "500",
    fontSize: 20,
    fontFamily: PRIMARY_FONT,
    color: "white",
  },
  textHorizontal: {
    textAlign: "center",
    fontWeight: "300",
    fontSize: 14,
    fontFamily: PRIMARY_FONT,
    color: "white",
  },

  photo: {
    marginLeft: 5,
    backgroundColor: "#333",
    borderColor: "#2C2C2C",
    borderWidth: 2,
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  textContainer: {
    marginLeft: 10,
    height: 60,
    padding: 8,
  },
  subtext: {
    fontWeight: "300",
    fontSize: 14,
    paddingTop: 3,
    fontFamily: PRIMARY_FONT,
    color: "white",
  },
})

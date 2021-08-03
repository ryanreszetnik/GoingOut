import React, { Fragment, useEffect, useState } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { useSelector } from "react-redux"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { CONFIRMED, REQUEST, REQUESTED } from "../Constants/constants"
import { updateFriendRequest } from "../Socket/socketMethods"
import theme from "../Theme/theme.style"
import { getImageURIBySub } from "../Utils/aws.utils"
import defaultImg from "../../Assets/default-profile-pic.jpg"

export default function UserProfilePage({ goToFriends, showFriends, sub }) {
  const friendship = useSelector((state) =>
    state.friends.find((f) => f.sub === sub)
  )
  const friendStatus = friendship ? friendship.status : ""
  const signedInProfile = useSelector((state) => state.profile)
  const profile = useSelector((state) =>
    state.loadedProfiles.find((p) => p.sub === sub)
  )
  const photo = useSelector((state) => state.profile.photo)
  const [imgSource, setImgSource] = useState()
  useEffect(() => {
    getImg()
  }, [photo])
  const getImg = async () => {
    setImgSource(await getImageURIBySub(profile.sub))
  }
  const sendRequest = async () => {
    try {
      updateFriendRequest(profile.sub, true)
    } catch (error) {
      console.log(error)
    }
  }
  const requestAccept = async () => {
    try {
      updateFriendRequest(profile.sub, true)
    } catch (error) {
      console.log(error)
    }
  }
  const removeFriend = async () => {
    try {
      updateFriendRequest(profile.sub, false)
    } catch (error) {
      console.log(error)
    }
  }

  const getButtons = (sub) => {
    if (signedInProfile.sub === sub) {
      return <Fragment />
    }
    switch (friendStatus) {
      case REQUESTED:
        return (
          <TouchableOpacity onPress={removeFriend}>
            <Text style={styles.buttonText}>Cancel Request</Text>
          </TouchableOpacity>
        )
      case REQUEST:
        return (
          <View style={styles.incoming}>
            <TouchableOpacity
              onPress={requestAccept}
              style={styles.primaryButton}
            >
              <Text style={styles.buttonText}>Accept Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={removeFriend}
              style={styles.secondaryButton}
            >
              <Text style={styles.buttonText}>Deny Request</Text>
            </TouchableOpacity>
          </View>
        )
      case CONFIRMED:
        return (
          <TouchableOpacity
            onPress={removeFriend}
            style={styles.secondaryButton}
          >
            <Text style={styles.buttonText}>Remove Friend</Text>
          </TouchableOpacity>
        )
      default:
        return (
          <TouchableOpacity onPress={sendRequest} style={styles.primaryButton}>
            <Text style={styles.buttonText}>Friend Request</Text>
          </TouchableOpacity>
        )
    }
  }

  return (
    <View>
      {profile && (
        <View style={styles.container}>
          <Text style={styles.imgTitle}>{profile.name}</Text>
          <View style={styles.imageFriends}>
            <Image
              style={styles.img}
              source={imgSource}
              defaultSource={defaultImg}
            />

            <View style={styles.col}>
              {showFriends && (
                <TouchableOpacity onPress={goToFriends}>
                  <Text style={styles.imgText}>
                    <MaterialCommunityIcons
                      name="account-group"
                      size={20}
                      color="#6e6869"
                      style={styles.icon}
                    />
                    {`   Friends`}
                  </Text>
                </TouchableOpacity>
              )}
              {getButtons(sub)}
            </View>
          </View>

          <View style={styles.attributeContainer}>
            <View style={styles.txtField}>
              <Text>
                <MaterialCommunityIcons
                  name="account"
                  size={20}
                  color="#6e6869"
                  style={styles.icon}
                />
                Username
              </Text>
              <Text style={styles.attributeTxt}>{profile.username}</Text>
            </View>

            <View style={styles.txtField}>
              <Text>
                <MaterialCommunityIcons
                  name="emoticon-happy-outline"
                  size={20}
                  color="#6e6869"
                  style={styles.icon}
                />
                Gender
              </Text>
              <Text style={styles.attributeTxt}>{profile.gender}</Text>
            </View>
            <View style={styles.txtField}>
              <Text>
                <MaterialCommunityIcons
                  name="cake"
                  size={20}
                  color="#6e6869"
                  style={styles.icon}
                />
                Birth Date
              </Text>
              <Text style={styles.attributeTxt}>{profile.birthdate}</Text>
            </View>
          </View>
        </View>
      )}
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
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    marginLeft: "10%",
  },
  imageFriends: {
    flexDirection: "row",
  },
  col: {
    flexDirection: "column",
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
  primaryButton: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 6,
    padding: 5,
    width: 120,
    height: 30,
    borderWidth: 1,
    borderColor: "#888",
    margin: 5,
  },
  secondaryButton: {
    backgroundColor: theme.SECONDARY_COLOR,
    borderRadius: 6,
    padding: 5,
    width: 120,
    height: 30,
    borderWidth: 1,
    borderColor: "#888",
    margin: 5,
  },
  incoming: {
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
  },
})

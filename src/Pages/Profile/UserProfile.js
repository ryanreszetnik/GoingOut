import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import AppButton from "../../../Components/AppButton"
// import {
//   acceptRequest,
//   deleteFriend,
//   requestFriend,
// } from "../../Endpoints/friendsEndpoints"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SET_CUR_PROFILE, SET_OTHER_FRIENDS } from "../../Actions/friendActions"
import { CONFIRMED, REQUEST, REQUESTED } from "../../Constants/friendConstants"
import { updateFriendRequest } from "../../Socket/SocketMethods"
import theme from "../../Styles/theme.style"
import Profile from "./Profile"
import { defaultImg, getImageURIBySub } from "../../aws-exports"

export default function UserProfile({ navigation }) {
  const profile = useSelector((state) => state.friends.curProfile)
  const friendsList = useSelector((state) => state.friends.friends)
  const [imgSource, setImgSource] = useState()
  useEffect(() => {
    getImg()
  }, [])
  const getImg = async () => {
    setImgSource(await getImageURIBySub(profile.sub))
  }
  const dispatch = useDispatch()
  const sendRequest = async () => {
    try {
      // console.log(await requestFriend(profile.sub))
      // dispatch({ type: ADD_FRIEND, payload: profile })
      updateFriendRequest(profile.sub, true)
    } catch (error) {
      console.log(error)
    }
    // navigation.navigate("Friends")
  }
  const requestAccept = async () => {
    try {
      //const ret = await acceptRequest(profile.sub)
      // dispatch({ type: ACCEPT_REQUEST, payload: profile })
      updateFriendRequest(profile.sub, true)
    } catch (error) {
      console.log(error)
    }
    // navigation.navigate("Friends")
  }
  const removeFriend = async () => {
    try {
      // const ret = await deleteFriend(profile.sub)
      // console.log(ret)
      // dispatch({ type: REMOVE_FRIEND, payload: profile })
      // console.log(profile.sub)
      // console.log("new List", friendsList)
      updateFriendRequest(profile.sub, false)
    } catch (error) {
      console.log(error)
    }
    // navigation.navigate("Friends")
  }

  const getButtons = () => {
    switch (profile.status) {
      case REQUESTED:
        return (
          <TouchableOpacity onPress={removeFriend}>
            <Text>Cancel Request</Text>
          </TouchableOpacity>
        )
      case REQUEST:
        return (
          <View>
            <TouchableOpacity
              onPress={requestAccept}
              style={styles.primaryButton}
            >
              <Text>Accept Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={removeFriend}
              style={styles.secondaryButton}
            >
              <Text>Deny Request</Text>
            </TouchableOpacity>
          </View>
        )
      case CONFIRMED:
        return (
          <TouchableOpacity
            onPress={removeFriend}
            style={styles.secondaryButton}
          >
            <Text>Remove Friend</Text>
          </TouchableOpacity>
        )
      default:
        return (
          <TouchableOpacity onPress={sendRequest} style={styles.primaryButton}>
            <Text>Friend Request</Text>
          </TouchableOpacity>
        )
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.imgTitle}>{profile.name}</Text>
        <View style={styles.imageFriends}>
          <Image style={styles.img} source={imgSource} />
          <View style={styles.col}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("User Friends")
              }}
            >
              <Text style={styles.imgText}>
                <MaterialCommunityIcons
                  name='account-group'
                  size={20}
                  color='#6e6869'
                  style={styles.icon}
                />
                {`   Friends`}
              </Text>
            </TouchableOpacity>
            {getButtons()}
          </View>
        </View>

        <View style={styles.attributeContainer}>
          <View style={styles.txtField}>
            <Text>
              <MaterialCommunityIcons
                name='account'
                size={20}
                color='#6e6869'
                style={styles.icon}
              />
              Username
            </Text>
            <Text style={styles.attributeTxt}>{profile.username}</Text>
          </View>

          <View style={styles.txtField}>
            <Text>
              <MaterialCommunityIcons
                name='emoticon-happy-outline'
                size={20}
                color='#6e6869'
                style={styles.icon}
              />
              Gender
            </Text>
            <Text style={styles.attributeTxt}>{profile.gender}</Text>
          </View>
          <View style={styles.txtField}>
            <Text>
              <MaterialCommunityIcons
                name='cake'
                size={20}
                color='#6e6869'
                style={styles.icon}
              />
              Birth Date
            </Text>
            <Text style={styles.attributeTxt}>{profile.birthdate}</Text>
          </View>
        </View>
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
    width: 100,
    height: 30,
  },
  secondaryButton: {
    backgroundColor: theme.SECONDARY_COLOR,
    borderRadius: 6,
    padding: 5,
    width: 120,
    height: 30,
  },
})

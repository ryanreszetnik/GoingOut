import React, { useEffect } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import AppButton from "../../../Components/AppButton"
import {
  acceptRequest,
  deleteFriend,
  requestFriend,
} from "../../Endpoints/friendsEndpoints"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import {
  ACCEPT_REQUEST,
  ADD_FRIEND,
  REMOVE_FRIEND,
  SET_CUR_PROFILE,
  SET_OTHER_FRIENDS,
} from "../../Actions/friendActions"
import { CONFIRMED, REQUEST, REQUESTED } from "../../Constants/friendConstants"

export default function UserProfile({ navigation }) {
  const profile = useSelector((state) => state.friends.curProfile)
  const dispatch = useDispatch()
  const sendRequest = async () => {
    try {
      const ret = await requestFriend(profile.sub)
      dispatch({ type: ADD_FRIEND, payload: { ...profile } })
    } catch (error) {
      console.log(error)
    }
    navigation.navigate("Friends")
  }
  const requestAccept = async () => {
    try {
      const ret = await acceptRequest(profile.sub)
      dispatch({ type: ACCEPT_REQUEST, payload: { ...profile } })
    } catch (error) {
      console.log(error)
    }
    navigation.navigate("Friends")
  }
  const removeFriend = async () => {
    console.log(profile.status)
    try {
      const ret = await deleteFriend(profile.sub)
      console.log(ret)
      dispatch({ type: REMOVE_FRIEND, payload: { ...profile } })
      console.log(profile.sub)
    } catch (error) {
      console.log(error)
    }
    navigation.navigate("Friends")
  }
  useEffect(() => {
    console.log(JSON.stringify(profile))
  }, [profile])

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
            <TouchableOpacity onPress={requestAccept}>
              <Text>Accept Request</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={removeFriend}>
              <Text>Deny Request</Text>
            </TouchableOpacity>
          </View>
        )
      case CONFIRMED:
        return (
          <TouchableOpacity onPress={removeFriend}>
            <Text>Remove Friend</Text>
          </TouchableOpacity>
        )
      default:
        return (
          <TouchableOpacity onPress={sendRequest}>
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
          <Image style={styles.img} />
          <View style={styles.col}>
            <TouchableOpacity>
              <Text
                onPress={() => {
                  dispatch({ type: SET_OTHER_FRIENDS, payload: profile })
                  navigation.navigate("User Friends")
                }}
                style={styles.imgText}
              >
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
})
import React, { Fragment, useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
} from "react-native"
import { useSelector } from "react-redux"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { CONFIRMED, REQUEST, REQUESTED } from "../Constants/constants"
import { updateFriendRequest } from "../Socket/socketMethods"
import theme from "../Theme/theme.style"
import { getImageURIBySub } from "../Utils/aws.utils"
import defaultImg from "../../Assets/default-profile-pic.jpg"
import SmallButton from "../Components/SmallButton"
import { useRef } from "react"
import { Button, Overlay } from "react-native-elements"
import { navigate, push } from "../Navigation/RootNavigation"
import { PROFILE_FRIENDS } from "../Constants/screens"

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

  const getButtonNames = () => {
    switch (friendStatus) {
      case REQUESTED:
        return {
          icon: "user-minus",
          name: "Cancel Request",
          onPress: removeFriend,
          overlay: false,
        }
      case REQUEST:
        return {
          icon: "exclamation",
          name: "Pending Request",
          onPress: () => {
            setOverlay(!overlay)
          },
          overlay: true,
        }
      case CONFIRMED:
        return {
          icon: "user-minus",
          name: "Remove Friend",
          onPress: removeFriend,
          overlay: false,
        }
      default:
        return {
          icon: "user-plus",
          name: "Friend Request",
          onPress: sendRequest,
          overlay: false,
        }
    }
  }
  const buttonNames = getButtonNames()
  const animatedValue1 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const animatedValue2 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const animatedValue3 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const opacityAnimator = useRef(new Animated.Value(0)).current
  const opacityAnimator2 = useRef(new Animated.Value(0)).current
  const [overlay, setOverlay] = useState(buttonNames.overlay)
  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(animatedValue1, {
          toValue: { x: -50, y: 40 },
          duration: 1,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue2, {
          toValue: { x: -60, y: 0 },
          duration: 1,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue3, {
          toValue: { x: -50, y: -40 },
          duration: 1,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.stagger(300, [
          Animated.spring(animatedValue1, {
            toValue: { x: 0, y: 0 },
            speed: 1,
            useNativeDriver: true,
          }),
          Animated.spring(animatedValue2, {
            toValue: { x: 0, y: 0 },
            speed: 1,
            useNativeDriver: true,
          }),
          Animated.spring(animatedValue3, {
            toValue: { x: 0, y: 0 },
            speed: 1,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnimator2, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(opacityAnimator, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start()
  }, [])
  return (
    <ScrollView>
      {profile && (
        <View style={{ backgroundColor: "#111", height: "100%" }}>
          <Text style={styles.pageTitle}>{profile.name}</Text>
          <View style={styles.topOfPage}>
            <View style={styles.leftHalf}>
              <Image
                style={styles.img}
                source={imgSource}
                defaultSource={defaultImg}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <SmallButton
                size={50}
                icon='user-friends'
                onPress={() => {
                  push(PROFILE_FRIENDS, { sub })
                }}
                style={{
                  width: 75,
                  marginVertical: "auto",
                }}
                textStyle={{ color: "white" }}
                animatedValue={animatedValue1.getTranslateTransform()}
                opacityAnimator={opacityAnimator}
              />

              <SmallButton
                size={50}
                icon={buttonNames.icon}
                onPress={buttonNames.onPress}
                style={{
                  width: 75,
                  marginLeft: 20,
                  marginVertical: "auto",
                }}
                textStyle={{ color: "white" }}
                animatedValue={animatedValue2.getTranslateTransform()}
                opacityAnimator={opacityAnimator}
              />
              <SmallButton
                size={50}
                icon={"comment"}
                onPress={() => {}}
                style={{
                  width: 75,
                }}
                textStyle={{ color: "white" }}
                animatedValue={animatedValue3.getTranslateTransform()}
                opacityAnimator={opacityAnimator}
              />
            </View>
          </View>
          <Overlay
            isVisible={overlay}
            onBackdropPress={() => {
              setOverlay(!overlay)
            }}
            overlayStyle={{ backgroundColor: "#2C2C2C", borderRadius: 30 }}
          >
            <Text style={styles.requestTitle}>
              {profile.name.substr(0, profile.name.indexOf(" "))} wants to be
              your friend!
            </Text>
            <Image style={styles.requestImage} source={imgSource}></Image>
            <View style={styles.requestContainer}>
              <Button
                buttonStyle={styles.requestButton}
                title='Accept'
                titleStyle={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "SF Pro Display",
                }}
                onPress={() => {
                  requestAccept()
                  setOverlay(!overlay)
                }}
              ></Button>
              <Button
                buttonStyle={styles.requestButton}
                title='Decline'
                titleStyle={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "SF Pro Display",
                }}
                onPress={() => {
                  removeFriend()
                  setOverlay(!overlay)
                }}
              ></Button>
            </View>
          </Overlay>
          <Animated.View
            style={{ ...styles.bioContainer, opacity: opacityAnimator2 }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                textAlign: "center",
                margin: 5,
              }}
            >
              sample biodjask jhdklsa jhdfas as
              fj;js;ja;fas;lfj;saljlas;jfasl;jf;ljals
            </Text>
          </Animated.View>
          <Animated.View
            style={{ ...styles.imagesContainer, opacity: opacityAnimator2 }}
          ></Animated.View>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  leftHalf: {
    height: "100%",
    width: "60%",
    justifyContent: "center",
  },
  topOfPage: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    height: 220,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "white",
    alignSelf: "flex-end",
    marginVertical: 20,
    borderColor: "#2C2C2C",
    borderWidth: 2,
  },
  buttonsContainer: {
    marginLeft: -5,
    width: "45%",
    height: "100%",
    alignSelf: "center",

    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  bioContainer: {
    width: "85%",
    alignSelf: "center",
    height: "auto",
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    shadowColor: "white",
    elevation: 10,
  },
  imgBorder: {
    width: 135,
    height: 135,
    borderRadius: 100,
    backgroundColor: "white",
    alignSelf: "center",
    borderColor: "white",
    borderWidth: 3,
    justifyContent: "center",
  },
  pageTitle: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "SF Pro Display",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 29,
    color: "white",
    marginTop: 10,
  },
  imagesContainer: {
    alignSelf: "center",
    width: "85%",
    height: 500,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 10,
    marginVertical: 20,
  },
  requestContainer: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#222",
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  requestTitle: {
    fontFamily: "SF Pro Display",
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  requestButton: {
    backgroundColor: "#3C3C3C",
    padding: 4,
    margin: 8,
    width: 150,
    borderRadius: 10,
  },
  requestImage: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 200,
  },
})

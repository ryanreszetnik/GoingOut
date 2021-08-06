import React, { useEffect, useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
} from "react-native"
import { useSelector } from "react-redux"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { getImageURIBySub } from "../../Utils/aws.utils"
import defaultImg from "../../../Assets/default-profile-pic.jpg"
import {
  EVENTS_PAGE,
  PROFILE_EDIT_PROFILE,
  PROFILE_FRIENDS,
} from "../../Constants/screens"
import SmallButton from "../../Components/SmallButton"
import { push } from "../../Navigation/RootNavigation"
import { PRIMARY_FONT } from "../../Theme/theme.style"

export default function ViewProfile({ navigation }) {
  const profile = useSelector((state) => state.profile)
  const userData = useSelector((state) => state.userSession.userData)
  const [imgSource, setImgSource] = useState(null)
  useEffect(() => {
    getImg()
  }, [profile])
  const getImg = async () => {
    setImgSource(await getImageURIBySub(userData.attributes.sub))
  }
  // const animatedValue1 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  // const animatedValue3 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  // const opacityAnimator = useRef(new Animated.Value(0)).current
  // const opacityAnimator2 = useRef(new Animated.Value(0)).current
  return (
    <ScrollView style={{ backgroundColor: "#1B1B1B", height: "100%" }}>
      {profile && (
        <View>
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
                icon="user-friends"
                onPress={() => {
                  navigation.push(PROFILE_FRIENDS, { sub: profile.sub })
                }}
                style={{
                  width: 75,
                  marginVertical: "auto",
                }}
                textStyle={{ color: "white" }}
                //animatedValue={animatedValue1.getTranslateTransform()}
                //opacityAnimator={opacityAnimator}
              />
              <SmallButton
                size={50}
                icon={"user-edit"}
                onPress={() => {
                  navigation.navigate(PROFILE_EDIT_PROFILE)
                }}
                style={{
                  width: 75,
                }}
                textStyle={{ color: "white" }}
                //animatedValue={animatedValue3.getTranslateTransform()}
                //opacityAnimator={opacityAnimator}
              />
            </View>
          </View>
          <Animated.View
            style={{ ...styles.bioContainer /*opacity: opacityAnimator2*/ }}
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
            style={{ ...styles.imagesContainer /*opacity: opacityAnimator2*/ }}
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
    marginTop: 20,
    marginLeft: -5,
    width: "45%",
    height: "100%",
    alignSelf: "center",
    justifyContent: "space-evenly",
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
    fontFamily: PRIMARY_FONT,
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
})

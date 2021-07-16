import API from "@aws-amplify/api"
import Amplify, { Auth } from "aws-amplify"
import React, { useEffect, useState, version } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { SET_PROFILE } from "../../Actions/profileActions"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../../Endpoints/profileEndpoints"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { defaultImg, getImageURIBySub } from "../../aws-exports"

export default function ViewProfile({ navigation }) {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile)
  const userData = useSelector((state) => state.userSession.userData)
  const [imgSource, setImgSource] = useState(defaultImg)
  useEffect(() => {
    getImg()
  }, [profile])
  const getImg = async () => {
    setImgSource(await getImageURIBySub(userData.attributes.sub))
  }
  async function getProfile() {
    try {
      dispatch({
        type: SET_PROFILE,
        payload: await getUser(userData.attributes.sub),
      })
    } catch (error) {
      console.log(`ERROR MESSAGE: ${error.message}`)
    }
  }

  return (
    <View style={{ backgroundColor: "#e0e0e0" }}>
      {profile ? (
        <View style={styles.container}>
          <View style={styles.topOfPage}>
            <View style={styles.imgFollowers}>
              <Image style={styles.img} source={imgSource} />

              <View style={styles.imageFriends}>
                <View style={styles.friendsButton}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Friends")
                    }}
                    style={{ backgroundColor: "#c0c0c0" }}
                  >
                    <Text style={styles.imgText}>
                      <MaterialCommunityIcons
                        name="account-multiple"
                        size={20}
                        color="#6e6869"
                        style={styles.icon}
                      />
                      {`Friends`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text style={styles.imgTitle}>{profile.name}</Text>
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
                  name="email"
                  size={20}
                  color="#6e6869"
                  style={styles.icon}
                />
                Email
              </Text>
              <Text style={styles.attributeTxt}>{profile.email}</Text>
            </View>
            <View style={styles.txtField}>
              <Text>
                <MaterialCommunityIcons
                  name="phone"
                  size={20}
                  color="#6e6869"
                  style={styles.icon}
                />
                Phone Number
              </Text>
              <Text style={styles.attributeTxt}>{profile.phone_number}</Text>
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
      ) : (
        <View />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
  },
  imgFollowers: {
    flexDirection: "row",
  },
  topOfPage: {
    width: "100%",

    alignItems: "baseline",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "white",
  },
  imageFriends: {
    flexDirection: "row",
    padding: 30,
    paddingLeft: 0,
  },

  imgText: {
    padding: 5,
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
  friendsButton: {
    paddingLeft: 40,

    margin: 0,
  },
})
//await Auth.currentAuthenticatedUser()

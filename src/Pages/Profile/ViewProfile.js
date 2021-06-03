import API from "@aws-amplify/api"
import Amplify, { Auth } from "aws-amplify"
import React, { version } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { SET_PROFILE } from "../../Actions/profileActions"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../../Endpoints/profileEndpoints"
import { MaterialCommunityIcons } from "@expo/vector-icons"
export default function ViewProfile({ navigation }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userSession.user)
  const profile = useSelector((state) => state.profile)
  const userData = useSelector((state) => state.userSession.userData)

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

  if (!profile) {
    getProfile()
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#e0e0e0" }}>
      {profile ? (
        <View style={styles.container}>
          <Text style={styles.imgTitle}>{profile.name}</Text>
          <Image style={styles.img} />
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
                  name='email'
                  size={20}
                  color='#6e6869'
                  style={styles.icon}
                />
                Email
              </Text>
              <Text style={styles.attributeTxt}>{profile.email}</Text>
            </View>
            <View style={styles.txtField}>
              <Text>
                <MaterialCommunityIcons
                  name='phone'
                  size={20}
                  color='#6e6869'
                  style={styles.icon}
                />
                Phone Number
              </Text>
              <Text style={styles.attributeTxt}>{profile.phone_number}</Text>
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
      ) : (
        <View />
      )}
    </SafeAreaView>
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
    alignSelf: "center",
  },
  imgTitle: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
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
//await Auth.currentAuthenticatedUser()

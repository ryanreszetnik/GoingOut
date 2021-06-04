import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import AppButton from "../../../Components/AppButton"
import { requestFriend } from "../../Endpoints/friendsEndpoints"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SET_CUR_PROFILE, SET_OTHER_FRIENDS } from "../../Actions/friendActions"

export default function UserProfile({ navigation }) {
  const profile = useSelector((state) => state.friends.curProfile)
  const dispatch = useDispatch()
  const sendRequest = async () => {
    try {
      await requestFriend(profile.sub)
    } catch (error) {
      console.log(error)
    }
    navigation.navigate("Friends")
  }
  return (
    <View>
      {profile && <Text>{profile.username}</Text>}
      <View style={styles.container}>
        <Text style={styles.imgTitle}>{profile.name}</Text>
        <View style={styles.imageFriends}>
          <Image style={styles.img} />
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

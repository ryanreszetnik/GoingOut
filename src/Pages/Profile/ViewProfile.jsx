import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { useSelector } from "react-redux"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { getImageURIBySub } from "../../Utils/aws.utils"
import defaultImg from "../../../Assets/default-profile-pic.jpg"
import { PROFILE_FRIENDS } from "../../Constants/screens"

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

  return (
    <View style={{ backgroundColor: "#212121", height: "100%" }}>
      {profile ? (
        <View style={styles.container}>
          <Text style={styles.imgTitle}>{profile.name}</Text>
          <View style={styles.topOfPage}>
            <View style={styles.imgFollowers}>
              <Image
                style={styles.img}
                source={imgSource}
                defaultSource={defaultImg}
              />
              <View style={styles.imageFriends}></View>
            </View>
          </View>
          <View style={styles.friendsButton}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(PROFILE_FRIENDS, { sub: profile.sub })
              }}
              style={{ backgroundColor: "#c0c0c0" }}
            >
              <Text style={styles.imgText}>
                <MaterialCommunityIcons
                  name='account-multiple'
                  size={20}
                  color='#6e6869'
                  style={styles.icon}
                />
                {`Friends`}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.attributeContainer}>
            <View style={styles.txtField}>
              <Text style={styles.attributeTitle}>
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
              <Text style={styles.attributeTitle}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignContent: "center",
    width: "100%",
  },
  imgFollowers: {
    flexDirection: "row",
  },
  topOfPage: {
    width: "100%",
    alignItems: "baseline",
    alignSelf: "center",
    alignItems: "center",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "white",
    alignSelf: "center",
  },
  imageFriends: {
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
    color: "white",
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
    color: "white",
  },
  friendsButton: {
    width: "30% ",
  },
  attributeTitle: {
    color: "white",
  },
})

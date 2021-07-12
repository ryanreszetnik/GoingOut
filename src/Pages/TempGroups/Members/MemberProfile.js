import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useSelector, useDispatch } from "react-redux"
import { MaterialCommunityIcons } from "@expo/vector-icons"
export default function MemberProfile({ navigation }) {
  const profile = useSelector((state) => state.friends.curProfile)
  return (
    <View style={styles.container}>
      <Text style={styles.imgTitle}>{profile.name}</Text>
      <View style={styles.imageFriends}>
        <Image style={styles.img} />
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
    alignSelf: "center",
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

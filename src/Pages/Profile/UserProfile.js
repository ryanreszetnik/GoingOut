import React from "react"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import AppButton from "../../../Components/AppButton"
import { requestFriend } from "../../Endpoints/friendsEndpoints"

export default function UserProfile({ navigation }) {
  const profile = useSelector((state) => state.friends.curProfile)

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
      <AppButton onPress={sendRequest} title='Send Friend Request' />
    </View>
  )
}

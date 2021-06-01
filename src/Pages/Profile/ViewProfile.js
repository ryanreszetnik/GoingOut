import API from "@aws-amplify/api"
import React from "react"
import { View, Text, Button } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"

export default function ViewProfile({ navigation }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userSession.user)
  async function getProfile() {
    const apiRequest = {
      body: {},
      headers: {
        Authorization: user.signInUserSession.idToken.jwtToken,
        "Content-Type": "application/json",
      },
    }
    //   console.log(" token ",user.signInUserSession.idToken.jwtToken)
    //   console.log("Sending token access",user.signInUserSession.accessToken.jwtToken)
    API.get("ProfileEndpoint", "", apiRequest)
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  /*
{
    "context":{
        "cognitoUsername" : "$context.authorizer.claims['cognito:username']",
    }
}
    */
  return (
    <SafeAreaView>
      <Text>Profile Photo</Text>
      <Text>Name</Text>
      <Text>{user.username}</Text>
      <Text>{user.attributes.email}</Text>
      <Text>Phone</Text>
      <Text>Birthday</Text>
      <Text>Gender</Text>
      <Button title='req' onPress={getProfile} />
    </SafeAreaView>
  )
}

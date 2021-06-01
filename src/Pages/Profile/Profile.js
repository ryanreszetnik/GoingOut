import React from "react"
import { StyleSheet, Text, View, ActivityIndicator, Button } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import ViewProfile from "./ViewProfile"
import EditProfile from "./EditProfile"
const ProfileStack = createStackNavigator()
import { useSelector } from "react-redux"
import API from "@aws-amplify/api"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

export default function Profile({ navigation }) {
  const user = useSelector((state) => state.userSession.user)
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name='ViewProfile'
        component={ViewProfile}
        options={{
          headerTitle: user.username,
          headerRight: () => (
            <FontAwesome5
              name='user-edit'
              color='tomato'
              onPress={() => navigation.navigate("EditProfile")}
            />
          ),
        }}
      />
      <ProfileStack.Screen name='EditProfile' component={EditProfile} />
    </ProfileStack.Navigator>
  )
}

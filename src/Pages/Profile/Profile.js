import React from "react"
import { StyleSheet, Text, View, ActivityIndicator, Button } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import ViewProfile from "./ViewProfile"
import EditProfile from "./EditProfile"
const ProfileStack = createStackNavigator()
import { useSelector } from "react-redux"
import API from "@aws-amplify/api"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import ConfirmNewEmail from "./ConfirmNewEmail"
import Friends from "./Friends"
import UserProfile from "./UserProfile"

export default function Profile({ navigation }) {
  const user = useSelector((state) => state.userSession.user)
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name='View Profile'
        component={ViewProfile}
        options={{
          headerTitle: user.username,
          headerRight: () => (
            <View style={styles.headerView}>
              <Text
                onPress={() => navigation.navigate("Edit Profile")}
                style={styles.headerText}
              >
                Edit Profile
              </Text>
              <FontAwesome5
                style={{ marginRight: 20 }}
                size={20}
                name='user-edit'
                color='tomato'
                onPress={() => navigation.navigate("Edit Profile")}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen name='Edit Profile' component={EditProfile} />
      <ProfileStack.Screen name='Confirm Email' component={ConfirmNewEmail} />
      <ProfileStack.Screen name='Friends' component={Friends} />
      <ProfileStack.Screen name='User Profile' component={UserProfile} />
    </ProfileStack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
  },
  headerText: {
    marginRight: 10,
    color: "tomato",
  },
})

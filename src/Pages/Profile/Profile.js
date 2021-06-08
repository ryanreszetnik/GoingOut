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
import UserFriends from "./UserFriends"
import FriendSearch from "./FriendSearch"
import { TouchableOpacity } from "react-native-gesture-handler"

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
            <TouchableOpacity style={styles.headerView}>
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
            </TouchableOpacity>
          ),
        }}
      />
      <ProfileStack.Screen name='Edit Profile' component={EditProfile} />
      <ProfileStack.Screen name='Confirm Email' component={ConfirmNewEmail} />
      <ProfileStack.Screen
        name='Friends'
        component={Friends}
        options={{
          headerTitle: "Friends",
          headerRight: () => (
            <TouchableOpacity style={styles.headerView}>
              <Text
                onPress={() => navigation.navigate("Search Friends")}
                style={styles.headerText}
              >
                Add Friends
              </Text>
              <FontAwesome5
                style={{ marginRight: 20 }}
                size={20}
                name='plus'
                color='tomato'
                onPress={() => navigation.navigate("Edit Profile")}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ProfileStack.Screen name='User Profile' component={UserProfile} />
      <ProfileStack.Screen name='User Friends' component={UserFriends} />
      <ProfileStack.Screen name='Search Friends' component={FriendSearch} />
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

import React from "react"
import { StyleSheet, Text, View, ActivityIndicator, Button } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import ViewProfile from "./ViewProfile"
import EditProfile from "./EditProfile"
import { Auth } from "aws-amplify"
import { useDispatch, useSelector } from "react-redux"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import ConfirmNewEmail from "./ConfirmNewEmail"
import Friends from "./Friends"
import UserProfile from "./UserProfile"
import FriendSearch from "./FriendSearch"
import { TouchableOpacity } from "react-native-gesture-handler"
import {
  PROFILE_CONFIRM_EMAIL,
  PROFILE_EDIT_PROFILE,
  PROFILE_FRIENDS,
  PROFILE_VIEW,
  PROFILE_SEARCH_FRIENDS,
  PROFILE_PROFILE,
  PROFILE_SETTINGS,
} from "../../Constants/screens"
import { SET_AUTH_STATUS } from "../../Constants/reducerEvents"
import { LOGGED_OUT } from "../../Constants/constants"
import UserSettings from "./UserSettings"
const ProfileStack = createStackNavigator()
export default function Profile({ navigation, route }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userSession.user)

  return (
    <ProfileStack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#2C2C2C" } }}
    >
      <ProfileStack.Screen
        name={PROFILE_VIEW}
        component={ViewProfile}
        options={{
          headerTitle: user.username,
          headerTitleStyle: { color: "white" },
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerView}
              onPress={() => {
                navigation.navigate(PROFILE_SETTINGS)
              }}
            >
              <Text style={styles.headerText}>Settings</Text>
              <FontAwesome5
                style={{ marginRight: 20 }}
                size={20}
                name="cog"
                color="white"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ProfileStack.Screen
        name={PROFILE_EDIT_PROFILE}
        component={EditProfile}
        options={{
          headerTintColor: "white",
          headerTitle: "Edit Profile",
          headerTitleStyle: { color: "white" },
        }}
      />
      <ProfileStack.Screen
        name={PROFILE_CONFIRM_EMAIL}
        component={ConfirmNewEmail}
      />
      <ProfileStack.Screen
        name={PROFILE_SETTINGS}
        component={UserSettings}
        options={{
          headerTintColor: "white",
          headerTitle: "Settings",
          headerTitleStyle: { color: "white" },
        }}
      />
      <ProfileStack.Screen
        name={PROFILE_FRIENDS}
        component={Friends}
        options={{
          headerTintColor: "white",
          headerTitle: "Friends",
          headerTitleStyle: { color: "white" },
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerView}
              onPress={() => navigation.navigate(PROFILE_SEARCH_FRIENDS)}
            >
              <Text style={styles.headerText}>Add Friends</Text>
              <FontAwesome5
                style={{ marginRight: 20 }}
                size={20}
                name="plus"
                color="white"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ProfileStack.Screen
        name={PROFILE_PROFILE}
        component={UserProfile}
        options={{
          headerTintColor: "white",
          headerTitle: "View Profile",
        }}
      />
      <ProfileStack.Screen
        name={PROFILE_SEARCH_FRIENDS}
        component={FriendSearch}
        options={{
          headerTintColor: "white",
          headerTitle: "Search For Friends",
        }}
      />
    </ProfileStack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
  },
  headerText: {
    marginRight: 10,
    color: "white",
  },
})

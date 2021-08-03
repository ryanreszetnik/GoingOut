import React from "react"
import { StyleSheet, Text, View, ActivityIndicator, Button } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import ViewProfile from "./ViewProfile"
import EditProfile from "./EditProfile"

import { useSelector } from "react-redux"
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
} from "../../Constants/screens"
const ProfileStack = createStackNavigator()
export default function Profile({ navigation }) {
  const user = useSelector((state) => state.userSession.user)
  return (
    <ProfileStack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'black' } }}>
      <ProfileStack.Screen
        name={PROFILE_VIEW}
        component={ViewProfile}
        options={{
          headerTitle: user.username,
          headerTitleStyle:{color:"white"},
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerView}
              onPress={() => navigation.navigate(PROFILE_EDIT_PROFILE)}
            >
              <Text style={styles.headerText}>Edit Profile</Text>
              <FontAwesome5
                style={{ marginRight: 20 }}
                size={20}
                name="user-edit"
                color="white"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ProfileStack.Screen
        name={PROFILE_EDIT_PROFILE}
        component={EditProfile}
      />
      <ProfileStack.Screen
        name={PROFILE_CONFIRM_EMAIL}
        component={ConfirmNewEmail}
      />
      <ProfileStack.Screen
        name={PROFILE_FRIENDS}
        component={Friends}
        options={{
          headerTitle: "Friends",
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
                color="tomato"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ProfileStack.Screen name={PROFILE_PROFILE} component={UserProfile} />
      <ProfileStack.Screen
        name={PROFILE_SEARCH_FRIENDS}
        component={FriendSearch}
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

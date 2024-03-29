import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import CreateGroup from "./CreateGroup"
import CreateTempFromPerm from "./CreateEventFromPerm"
import ViewGroups from "./ViewGroups"
import ViewSingleGroup from "./ViewSingleGroup"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MemberList from "./MemberList"
import MemberProfile from "./MemberProfile"
import EditGroup from "./EditGroup"
import ChatView from "./ChatView"
import AddMembers from "./AddMembers"
import {
  GROUPS_ADD_MEMBERS,
  GROUPS_CHAT,
  GROUPS_CREATE_EVENT,
  GROUPS_CREATE_GROUP,
  GROUPS_EDIT_GROUP,
  GROUPS_EDIT_MEMBERS,
  GROUPS_LOCATION_SELECT,
  GROUPS_MEMBERS,
  GROUPS_POTENTIAL_LOCATION,
  GROUPS_PROFILE,
  GROUPS_SINGLE_GROUP,
  GROUPS_VIEW,
} from "../../Constants/screens"
import EditMembers from "./EditMembers"
import LocationAd from "../../CommonPages/LocationAd"
import LocationSelection from "../../CommonPages/LocationSelection"

const GroupNavigator = createStackNavigator()

export default function Groups() {
  return (
    <GroupNavigator.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#2C2C2C" },
        headerTintColor: "white",
      }}
    >
      <GroupNavigator.Screen
        name={GROUPS_VIEW}
        component={ViewGroups}
        options={({ navigation, route }) => {
          return {
            headerTitle: "Groups",
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerView}
                onPress={() => navigation.navigate(GROUPS_CREATE_GROUP)}
              >
                <Text style={styles.headerText}>Create Group</Text>
                <FontAwesome5
                  style={{ marginRight: 20 }}
                  size={20}
                  name="plus"
                  color="white"
                />
              </TouchableOpacity>
            ),
          }
        }}
      />
      <GroupNavigator.Screen
        name={GROUPS_CREATE_EVENT}
        component={CreateTempFromPerm}
      />
      <GroupNavigator.Screen
        name={GROUPS_CREATE_GROUP}
        component={CreateGroup}
      />
      <GroupNavigator.Screen
        name={GROUPS_SINGLE_GROUP}
        component={ViewSingleGroup}
        options={({ navigation, route }) => {
          return {
            headerTitle: "Group Info",
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerView}
                onPress={() =>
                  navigation.navigate(GROUPS_MEMBERS, {
                    groupId: route.params.groupId,
                  })
                }
              >
                <Text style={styles.headerText}>View Members</Text>
                <FontAwesome5
                  style={{ marginRight: 20 }}
                  size={20}
                  name="users"
                  color="white"
                />
              </TouchableOpacity>
            ),
          }
        }}
      />

      <GroupNavigator.Screen
        name={GROUPS_CHAT}
        component={ChatView}
        options={({ navigation, route }) => {
          return {
            headerTitle: "Group Chat",
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerView}
                onPress={() =>
                  navigation.navigate(GROUPS_SINGLE_GROUP, {
                    groupId: route.params.groupId,
                  })
                }
              >
                <Text style={styles.headerText}>View Group Info</Text>
                <FontAwesome5
                  style={{ marginRight: 20 }}
                  size={20}
                  name="info"
                  color="white"
                />
              </TouchableOpacity>
            ),
          }
        }}
      />

      <GroupNavigator.Screen
        name={GROUPS_MEMBERS}
        component={MemberList}
        options={{ headerTitle: "Members" }}
      />

      <GroupNavigator.Screen
        name={GROUPS_EDIT_GROUP}
        component={EditGroup}
        options={{ headerTitle: "Edit Group" }}
      />
      <GroupNavigator.Screen
        name={GROUPS_ADD_MEMBERS}
        component={AddMembers}
        options={{ headerTitle: "Add Members" }}
      />

      <GroupNavigator.Screen
        name={GROUPS_PROFILE}
        component={MemberProfile}
        options={{ headerTitle: "Member Profile" }}
      />
      <GroupNavigator.Screen
        name={GROUPS_POTENTIAL_LOCATION}
        component={LocationAd}
        options={() => {
          return {
            headerTitle: "Potential Location",
          }
        }}
      />
      <GroupNavigator.Screen
        name={GROUPS_LOCATION_SELECT}
        component={LocationSelection}
        options={() => {
          return {
            headerTitle: "Select Location",
          }
        }}
      />
    </GroupNavigator.Navigator>
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

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
  GROUPS_MEMBERS,
  GROUPS_PROFILE,
  GROUPS_SINGLE_GROUP,
  GROUPS_VIEW,
} from "../../Constants/screens"

const GroupNavigator = createStackNavigator()

export default function Groups() {
  return (
    <GroupNavigator.Navigator>
      <GroupNavigator.Screen
        name={GROUPS_VIEW}
        component={ViewGroups}
        options={({ navigation, route }) => {
          return {
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
                  color="tomato"
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
                  color="tomato"
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
                  color="tomato"
                />
              </TouchableOpacity>
            ),
          }
        }}
      />

      <GroupNavigator.Screen name={GROUPS_MEMBERS} component={MemberList} />

      <GroupNavigator.Screen name={GROUPS_EDIT_GROUP} component={EditGroup} />
      <GroupNavigator.Screen name={GROUPS_ADD_MEMBERS} component={AddMembers} />

      <GroupNavigator.Screen name={GROUPS_PROFILE} component={MemberProfile} />
    </GroupNavigator.Navigator>
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

import { createStackNavigator } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { useSelector, useDispatch } from "react-redux"
import MonthPicker from "../../../Components/MonthPicker"
import CreatePermGroup from "./CreatePermGroup"
import ViewPermGroups from "./ViewPermGroups"
import ViewSingleGroup from "./ViewSingleGroup"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MemberList from "./MemberList"
import MemberProfile from "./MemberProfile"
import EditGroup from "./EditGroup"
import ChatView from "./ChatView"
import AddMembers from "./AddMembers"
import { SET_PERM_GROUPS } from "../../Actions/groupActions"
import { getPermGroups } from "../../Endpoints/permGroupsEndpoints"

const PermGroupNavigator = createStackNavigator()

const newGroupInitial = {
  name: "",
  members: [],
  datetime: "",
  bio: "",
  location: null,
  locationRange: 50,
  ageRange: {
    minAge: 0,
    maxAge: 100,
  },
  genderPreference: "Neutral",
}
export default function PermGroups({ navigation }) {
  const sub = useSelector((state) => state.userSession.userData.attributes.sub)
  const dispatch = useDispatch()

  const updateGroups = async () => {
    const payload = await getPermGroups(sub)
    dispatch({ type: SET_PERM_GROUPS, payload })
  }

  // useEffect(() => {
  //   updateGroups()
  // }, [])

  return (
    <PermGroupNavigator.Navigator>
      <PermGroupNavigator.Screen
        name='View Perm Groups'
        component={ViewPermGroups}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerView}
              onPress={() => navigation.navigate("Create Group")}
            >
              <Text style={styles.headerText}>Create Group</Text>
              <FontAwesome5
                style={{ marginRight: 20 }}
                size={20}
                name='plus'
                color='tomato'
              />
            </TouchableOpacity>
          ),
        }}
      />
      <PermGroupNavigator.Screen
        name='Create Group'
        component={CreatePermGroup}
      ></PermGroupNavigator.Screen>
      <PermGroupNavigator.Screen name='Choose Day' component={MonthPicker} />
      <PermGroupNavigator.Screen
        name='View Single Group'
        component={ViewSingleGroup}
        options={{
          headerTitle: "Group Info",
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerView}
              onPress={() => navigation.navigate("Members")}
            >
              <Text style={styles.headerText}>View Members</Text>
              <FontAwesome5
                style={{ marginRight: 20 }}
                size={20}
                name='users'
                color='tomato'
              />
            </TouchableOpacity>
          ),
        }}
      />
      <PermGroupNavigator.Screen
        name='Chat View'
        component={ChatView}
        options={{
          headerTitle: "Group Chat",
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerView}
              onPress={() => navigation.navigate("View Single Group")}
            >
              <Text style={styles.headerText}>View Group Info</Text>
              <FontAwesome5
                style={{ marginRight: 20 }}
                size={20}
                name='info'
                color='tomato'
              />
            </TouchableOpacity>
          ),
        }}
      />

      <PermGroupNavigator.Screen name='Members' component={MemberList} />
      <PermGroupNavigator.Screen name='Edit Group' component={EditGroup} />
      <PermGroupNavigator.Screen name='Add Members' component={AddMembers} />
      <PermGroupNavigator.Screen
        name='Member Profile'
        component={MemberProfile}
      />
    </PermGroupNavigator.Navigator>
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

import { createStackNavigator } from "@react-navigation/stack"
import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { useSelector } from "react-redux"
import MonthPicker from "../../../Components/MonthPicker"
import CreatePermGroup from "./CreatePermGroup"
import ViewPermGroups from "./ViewPermGroups"
import ViewSingleGroup from "./ViewSingleGroup"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MemberList from "./MemberList"
import MemberProfile from "./MemberProfile"
import EditGroup from "./EditGroup"
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
      <PermGroupNavigator.Screen name='Members' component={MemberList} />
      <PermGroupNavigator.Screen name='Edit Group' component={EditGroup} />
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

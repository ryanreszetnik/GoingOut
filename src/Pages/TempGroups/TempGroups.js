import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import Matches from "./Matching/Matches"
import ViewTempGroups from "./ViewTempGroups"
import CreateTempGroup from "./CreateTempGroup"
import { TouchableOpacity } from "react-native-gesture-handler"
import { View, Text, StyleSheet } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import ViewSingleTempGroup from "./ViewSingleTempGroup"
import TempGroupChatView from "./TempGroupChatView"

const TempGroupNavigator = createStackNavigator()

export default function TempGroups({ navigation }) {
  return (
    <TempGroupNavigator.Navigator>
      <TempGroupNavigator.Screen
        name='View Temp Groups'
        component={ViewTempGroups}
        options={{
          headerTitle: "View Temp Groups",
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerView}
              onPress={() => navigation.navigate("Create Temp Group")}
            >
              <Text style={styles.headerText}>Create Event</Text>
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
      <TempGroupNavigator.Screen
        name='Matches'
        component={TempGroupChatView}
        options={{
          headerTitle: "Chat",
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerView}
              onPress={() => navigation.navigate("Search For Matches")}
            >
              <Text style={styles.headerText}>Serach For Matches</Text>
              <FontAwesome5
                style={{ marginRight: 20 }}
                size={20}
                name='search'
                color='tomato'
              />
            </TouchableOpacity>
          ),
        }}
      />
      <TempGroupNavigator.Screen
        name='View Single Temp Group'
        component={ViewSingleTempGroup}
        options={{
          headerTitle: "Event Details",
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerView}
              onPress={() => navigation.navigate("Matches")}
            >
              <Text style={styles.headerText}>Chat</Text>
              <FontAwesome5
                style={{ marginRight: 20 }}
                size={20}
                name='comments'
                color='tomato'
              />
            </TouchableOpacity>
          ),
        }}
      />

      <TempGroupNavigator.Screen
        name='Search For Matches'
        component={Matches}
      />
      <TempGroupNavigator.Screen
        name='Create Temp Group'
        component={CreateTempGroup}
      />
    </TempGroupNavigator.Navigator>
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

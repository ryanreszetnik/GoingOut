import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import ViewSingleMatch from "./FindMatches/ViewSingleMatch"
import Matches from "./Matches"
import ViewTempGroups from "./ViewTempGroups"
import MatchMemberList from "./FindMatches/MatchMemberList"
import AddMatches from "./FindMatches/AddMatches"
import CreateTempGroup from "./CreateTempGroup"
import { TouchableOpacity } from "react-native-gesture-handler"
import { View, Text, StyleSheet } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

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
        component={Matches}
        options={{
          headerTitle: "Match Info",
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerView}
              onPress={() => navigation.navigate("Search For Matches")}
            >
              <Text style={styles.headerText}>View Members</Text>
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
        name='View Single Match'
        component={ViewSingleMatch}
        options={{
          headerTitle: "Match Info",
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerView}
              onPress={() => navigation.navigate("Match Member List")}
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
      <TempGroupNavigator.Screen
        name='Match Member List'
        component={MatchMemberList}
        options={{ headerTitle: "Members" }}
      />
      <TempGroupNavigator.Screen
        name='Search For Matches'
        component={AddMatches}
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

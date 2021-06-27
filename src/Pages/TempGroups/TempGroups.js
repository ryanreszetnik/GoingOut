import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import ViewSingleMatch from "./FindMatches/ViewSingleMatch"
import Matches from "./Matches"
import ViewTempGroups from "./ViewTempGroups"
import MatchMemberList from "./FindMatches/MatchMemberList"
import AddMatches from "./FindMatches/AddMatches"
const TempGroupNavigator = createStackNavigator()

export default function TempGroups() {
  return (
    <TempGroupNavigator.Navigator>
      <TempGroupNavigator.Screen
        name='View Temp Groups'
        component={ViewTempGroups}
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
    </TempGroupNavigator.Navigator>
  )
}

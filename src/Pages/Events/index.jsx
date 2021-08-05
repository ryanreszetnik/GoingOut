import { createStackNavigator } from "@react-navigation/stack"
import React from "react"

import ViewEvents from "./ViewEvents"
import PotentialMatches from "./PotentialMatches/PotentialMatches"
import CreateEvent from "./CreateEvent"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Text, StyleSheet } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import ViewSingleEvent from "./ViewSingleEvent"
import EventChat from "./EventChat"
import MatchChatView from "./Matches/MatchChatView"
import ViewSingleMatch from "./Matches/ViewSingleMatch"
import ViewPotentialMatch from "./PotentialMatches/ViewPotentialMatch"
import Merging from "./Matches/Merging"
import MemberList from "./Members/MemberList"
import AddMembers from "./Members/AddMembers"
import MemberProfile from "./Members/MemberProfile"
import EditEvent from "./EditEvent"
import {
  EVENTS_ADD_MEMBERS,
  EVENTS_CHAT,
  EVENTS_CREATE_EVENT,
  EVENTS_EDIT_EVENT,
  EVENTS_MATCHES,
  EVENTS_MATCH_CHAT,
  EVENTS_MEMBERS,
  EVENTS_MERGING,
  EVENTS_POTENTIAL_MATCH,
  EVENTS_PROFILE,
  EVENTS_SEARCH_MATCHES,
  EVENTS_SINGLE_EVENT,
  EVENTS_VIEW,
} from "../../Constants/screens"
import { EVENTS_SINGLE_MATCH } from "../../Constants/screens"

const EventNavigator = createStackNavigator()

export default function Events({ navigation }) {
  return (
    <EventNavigator.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#2C2C2C" },
        headerTintColor: "white",
      }}
    >
      <EventNavigator.Screen
        name={EVENTS_VIEW}
        component={ViewEvents}
        options={{
          headerTitle: "Events",
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerView}
              onPress={() => navigation.navigate(EVENTS_CREATE_EVENT)}
            >
              <FontAwesome5
                style={{ marginRight: 20 }}
                size={25}
                name='plus'
                color='white'
              />
            </TouchableOpacity>
          ),
        }}
      />
      <EventNavigator.Screen
        name={EVENTS_SINGLE_EVENT}
        component={ViewSingleEvent}
        options={({ navigation, route }) => {
          return {
            headerTitle: "Event Info",
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerView}
                onPress={() =>
                  navigation.navigate(EVENTS_EDIT_EVENT, {
                    eventId: route.params.eventId,
                  })
                }
              >
                <Text style={styles.headerText}>Edit</Text>
              </TouchableOpacity>
            ),
          }
        }}
      />

      <EventNavigator.Screen
        name={EVENTS_CHAT}
        component={EventChat}
        options={{
          headerTitle: "Event Chat",
        }}
      />
      <EventNavigator.Screen name={EVENTS_EDIT_EVENT} component={EditEvent} />
      <EventNavigator.Screen
        name={EVENTS_CREATE_EVENT}
        component={CreateEvent}
      />
      <EventNavigator.Screen
        name={EVENTS_SINGLE_MATCH}
        component={ViewSingleMatch}
        options={{ headerTitle: "Match Info" }}
      />

      <EventNavigator.Screen
        name={EVENTS_MATCH_CHAT}
        component={MatchChatView}
        options={({ navigation, route }) => {
          return {
            headerTitle: "Match Chat",
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerView}
                onPress={() =>
                  navigation.navigate(EVENTS_MERGING, {
                    eventId: route.params.eventId,
                    matchId: route.params.matchId,
                  })
                }
              >
                <Text style={styles.headerText}>Start Merging</Text>
                <FontAwesome5
                  style={{ marginRight: 20 }}
                  size={20}
                  name='link'
                  color='white'
                />
              </TouchableOpacity>
            ),
          }
        }}
      />

      <EventNavigator.Screen
        name={EVENTS_SEARCH_MATCHES}
        component={PotentialMatches}
      />
      <EventNavigator.Screen
        name={EVENTS_POTENTIAL_MATCH}
        component={ViewPotentialMatch}
        options={{ headerTitle: "Potential Match Info" }}
      />

      <EventNavigator.Screen name={EVENTS_MERGING} component={Merging} />
      <EventNavigator.Screen name={EVENTS_MEMBERS} component={MemberList} />
      <EventNavigator.Screen name={EVENTS_ADD_MEMBERS} component={AddMembers} />
      <EventNavigator.Screen name={EVENTS_PROFILE} component={MemberProfile} />
    </EventNavigator.Navigator>
  )
}
const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
  },
  headerText: {
    marginRight: 10,
    color: "white",
    fontSize: 18,
    paddingRight: 5,
  },
})

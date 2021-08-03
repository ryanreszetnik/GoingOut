import React, { Fragment } from "react"
import SocketClient from "../Socket"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import NotificationPage from "./Notifications"
import ProfilePage from "./Profile"
import EventsPage from "./Events"
import GroupsPage from "./Groups"
import Ionicons from "react-native-vector-icons/Ionicons"
import Fontawesome from "react-native-vector-icons/FontAwesome"
import {
  EVENTS_PAGE,
  GROUPS_PAGE,
  NOTIFICATIONS_PAGE,
  PROFILE_PAGE,
} from "../Constants/screens"
const Tab = createBottomTabNavigator()
export default function index() {
  return (
    <Fragment>
      <SocketClient />
      <Tab.Navigator
        lazy={false}
        
        screenOptions={({ route }) => ({
          
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "ios-information-circle"
            let iconType = "ion"
            switch (route.name) {
              case NOTIFICATIONS_PAGE:
                iconName = focused ? "notifications" : "notifications-outline"
                break
              case EVENTS_PAGE:
                iconName = focused ? "calendar" : "calendar-outline"

                break
              case GROUPS_PAGE:
                iconName = focused ? "chatbubbles" : "chatbubbles-outline"
                break
              case PROFILE_PAGE:
                iconName = focused ? "user" : "user-o"
                iconType = "font"
                break
            }
            if (iconType === "ion") {
              return <Ionicons name={iconName} size={size} color={color} />
            } else {
              return <Fontawesome name={iconName} size={size} color={color} />
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name={NOTIFICATIONS_PAGE}
          component={NotificationPage}
          options={{
            tabBarBadge: 2,
            tabBarLabel: () => {
              return null
            },
          }}
        />

        <Tab.Screen
          name={EVENTS_PAGE}
          component={EventsPage}
          options={{
            tabBarBadge: null,
            tabBarLabel: () => {
              return null
            },
          }}
        />

        <Tab.Screen
          name={GROUPS_PAGE}
          component={GroupsPage}
          options={{
            tabBarBadge: null,
            tabBarLabel: () => {
              return null
            },
          }}
        />
        <Tab.Screen
          name={PROFILE_PAGE}
          component={ProfilePage}
          options={{
            tabBarBadge: null,
            tabBarLabel: () => {
              return null
            },
          }}
        />
      </Tab.Navigator>
    </Fragment>
  )
}

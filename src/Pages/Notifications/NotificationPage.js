import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import Notifications from "./Notifications"
import RequestProfile from "./RequestProfile"

const NotificationNavigator = createStackNavigator()

export default function NotificationPage() {
  return (
    <NotificationNavigator.Navigator>
      <NotificationNavigator.Screen
        name="View Notifications"
        component={Notifications}
      />
      <NotificationNavigator.Screen
        name="User Profile"
        component={RequestProfile}
      />
    </NotificationNavigator.Navigator>
  )
}

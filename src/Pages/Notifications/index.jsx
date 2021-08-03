import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import {
  NOTIFICATIONS_PROFILE,
  NOTIFICATIONS_VIEW,
} from "../../Constants/screens"
import Notifications from "./Notifications"
import RequestProfile from "./RequestProfile"

const NotificationNavigator = createStackNavigator()

export default function NotificationPage() {
  return (
    <NotificationNavigator.Navigator>
      <NotificationNavigator.Screen
        name={NOTIFICATIONS_VIEW}
        component={Notifications}
        options={{
          headerTitle: "Notifications",
        }}
      />
      <NotificationNavigator.Screen
        name={NOTIFICATIONS_PROFILE}
        options={{
          headerTitle: "User Profile",
        }}
        component={RequestProfile}
      />
    </NotificationNavigator.Navigator>
  )
}

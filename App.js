import React, { useState, useEffect, Fragment } from "react"
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  LayoutAnimation,
} from "react-native"
import Amplify, { Auth } from "aws-amplify"
import { awsConfig, endpoints } from "./src/aws-exports"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import FlashMessage from "react-native-flash-message"
import SignIn from "./src/Pages/Authentication/SignIn"
import SignUp from "./src/Pages/Authentication/SignUp"
import ConfirmSignUp from "./src/Pages/Authentication/ConfirmSignUp"
import Profile from "./src/Pages/Profile/Profile"
import ForgotPassword from "./src/Pages/Authentication/ForgotPassword"
import { useDispatch, useSelector, batch } from "react-redux"
import Ionicons from "react-native-vector-icons/Ionicons"
import Fontawesome from "react-native-vector-icons/FontAwesome"

import {
  SET_AUTH_STATUS,
  SET_AUTH_USER,
  SET_CURR_USER_DATA,
} from "./src/Actions/authActions"
import {
  LOGGED_IN,
  LOGGED_OUT,
  INITIALIZING,
  LOADING_DATA,
} from "./src/Constants/authConstants"
import TempGroups from "./src/Pages/TempGroups/TempGroups"

import PermGroups from "./src/Pages/PermGroups/PermGroups"
import Notifications from "./src/Pages/Notifications/Notifications"
import { appLoad } from "./src/Endpoints/generalEndpoints"
import { SET_PROFILE } from "./src/Actions/profileActions"
import {
  SET_MATCHES,
  SET_PERM_GROUPS,
  SET_TEMP_GROUPS,
} from "./src/Actions/groupActions"
import { SET_CHATS } from "./src/Actions/chatActions"
import { SET_FRIENDS } from "./src/Actions/friendActions"
import SocketClient from "./src/Socket/SocketClient"
import NotificationPage from "./src/Pages/Notifications/NotificationPage"

Amplify.configure({ ...awsConfig, endpoints: endpoints })

const AuthenticationStack = createStackNavigator()
const Tab = createBottomTabNavigator()

const AuthenticationNavigator = (props) => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="SignIn" component={SignIn} />
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
      />
      <AuthenticationStack.Screen
        name="ResetPassword"
        component={ForgotPassword}
      />
    </AuthenticationStack.Navigator>
  )
}

const TabNavigator = () => {
  useEffect(() => {})
  return (
    <Fragment>
      <SocketClient />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "ios-information-circle"
            let iconType = "ion"
            switch (route.name) {
              case "Notifications":
                iconName = focused ? "notifications" : "notifications-outline"
                break
              case "Temp Groups":
                iconName = focused ? "calendar" : "calendar-outline"

                break
              case "Perm Groups":
                iconName = focused ? "chatbubbles" : "chatbubbles-outline"
                break
              case "Profile":
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
          name="Notifications"
          component={NotificationPage}
          options={{
            tabBarBadge: 2,
            tabBarLabel: () => {
              return null
            },
          }}
        />
        <Tab.Screen
          name="Temp Groups"
          component={TempGroups}
          options={{
            tabBarBadge: null,
            tabBarLabel: () => {
              return null
            },
          }}
        />
        <Tab.Screen
          name="Perm Groups"
          component={PermGroups}
          options={{
            tabBarBadge: null,
            tabBarLabel: () => {
              return null
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
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

const LoadingData = () => {
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.userSession.authStatus)
  useEffect(() => {
    initializeAppState()
  }, [authStatus])
  const initializeAppState = async () => {
    const initialAppData = await appLoad()
    console.log("loading app")
    if (!initialAppData) {
      dispatch({ type: SET_AUTH_STATUS, payload: LOGGED_OUT })
    } else {
      batch(() => {
        dispatch({ type: SET_AUTH_STATUS, payload: LOGGED_IN })
        dispatch({ type: SET_PROFILE, payload: initialAppData.profile })
        dispatch({ type: SET_PERM_GROUPS, payload: initialAppData.groups })
        dispatch({ type: SET_TEMP_GROUPS, payload: initialAppData.tempGroups })
        dispatch({ type: SET_CHATS, payload: initialAppData.messages })
        dispatch({ type: SET_FRIENDS, payload: initialAppData.friends })
        dispatch({ type: SET_MATCHES, payload: initialAppData.matches })
      })
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="tomato" />
      <Button title="Loading App Data" color="tomato" />
    </View>
  )
}

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="tomato" />
      <Button
        title="Reloading"
        color="tomato"
        onPress={() => checkAuthState()}
      />
    </View>
  )
}

function App() {
  const authStatus = useSelector((state) => state.userSession.authStatus)
  const dispatch = useDispatch()
  useEffect(() => {
    checkAuthState()
  }, [])

  async function checkAuthState() {
    try {
      dispatch({
        type: SET_AUTH_USER,
        payload: await Auth.currentAuthenticatedUser(),
      })
      dispatch({
        type: SET_CURR_USER_DATA,
        payload: await Auth.currentUserInfo(),
      })
      dispatch({ type: SET_AUTH_STATUS, payload: LOADING_DATA })
    } catch (err) {
      console.log(" User is not signed in")
      batch(() => {
        dispatch({ type: SET_AUTH_STATUS, payload: LOGGED_OUT })
        dispatch({ type: SET_AUTH_USER, payload: null })
      })
    }
  }
  return (
    <NavigationContainer>
      {authStatus === INITIALIZING && <Initializing />}
      {authStatus === LOADING_DATA && <LoadingData />}
      {authStatus === LOGGED_IN && <TabNavigator />}
      {authStatus === LOGGED_OUT && <AuthenticationNavigator />}
    </NavigationContainer>
  )
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})

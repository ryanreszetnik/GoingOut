import React, { useEffect } from "react"
import { View, Text, ActivityIndicator, Button } from "react-native"
import { useDispatch, useSelector, batch } from "react-redux"
import Amplify, { Auth } from "aws-amplify"
import { awsConfig } from "./Constants/aws-exports"
import AuthenticationNavigator from "./Authentication"
import AppNavigator from "./Pages"
import { appLoad } from "./Endpoints/generalEndpoints"
import {
  INITIALIZING,
  LOADING_DATA,
  LOGGED_IN,
  LOGGED_OUT,
} from "./Constants/constants"
import {
  SET_AUTH_STATUS,
  SET_AUTH_USER,
  SET_CURR_USER_DATA,
  SET_PROFILE,
  SET_GROUPS,
  SET_EVENTS,
  SET_CHATS,
  SET_FRIENDS,
  SET_MATCHES,
  SET_NOTIFICATIONS,
} from "./Constants/reducerEvents"
import { NavigationContainer } from "@react-navigation/native"
import { navigationRef } from "./Navigation/RootNavigation"
Amplify.configure(awsConfig)

const LoadingData = () => {
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.userSession.authStatus)
  useEffect(() => {
    initializeAppState()
  }, [authStatus])
  const initializeAppState = async () => {
    const initialAppData = await appLoad()
    const token = (await Auth.currentAuthenticatedUser()).signInUserSession
      .idToken.jwtToken
    console.log("loading app", initialAppData, token)
    if (!initialAppData) {
      dispatch({ type: SET_AUTH_STATUS, payload: LOGGED_OUT })
    } else {
      batch(() => {
        dispatch({ type: SET_AUTH_STATUS, payload: LOGGED_IN })
        dispatch({ type: SET_PROFILE, payload: initialAppData.profile })
        dispatch({ type: SET_GROUPS, payload: initialAppData.groups })
        dispatch({ type: SET_EVENTS, payload: initialAppData.events })
        dispatch({ type: SET_CHATS, payload: initialAppData.messages })
        dispatch({ type: SET_FRIENDS, payload: initialAppData.friends })
        dispatch({ type: SET_MATCHES, payload: initialAppData.matches })
        dispatch({
          type: SET_NOTIFICATIONS,
          payload: initialAppData.notifications,
        })
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
    </View>
  )
}
export default function App() {
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
    <NavigationContainer ref={navigationRef}>
      {authStatus === INITIALIZING && <Initializing />}
      {authStatus === LOADING_DATA && <LoadingData />}
      {authStatus === LOGGED_IN && <AppNavigator />}
      {authStatus === LOGGED_OUT && <AuthenticationNavigator />}
    </NavigationContainer>
  )
}

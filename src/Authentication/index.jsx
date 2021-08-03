import React from "react"
import { View, Text } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import {
  CONFIRM_SIGN_UP_PAGE,
  FORGOT_PASSWORD_PAGE,
  SIGN_IN_PAGE,
  SIGN_UP_PAGE,
} from "../Constants/screens"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import ConfirmSignUp from "./ConfirmSignUp"
import ForgotPassword from "./ForgotPassword"
const AuthenticationStack = createStackNavigator()
export default function Authentication() {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name={SIGN_IN_PAGE} component={SignIn} />
      <AuthenticationStack.Screen name={SIGN_UP_PAGE} component={SignUp} />
      <AuthenticationStack.Screen
        name={CONFIRM_SIGN_UP_PAGE}
        component={ConfirmSignUp}
      />
      <AuthenticationStack.Screen
        name={FORGOT_PASSWORD_PAGE}
        component={ForgotPassword}
      />
    </AuthenticationStack.Navigator>
  )
}

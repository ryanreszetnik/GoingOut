import Auth from "@aws-amplify/auth"
import React, { useState } from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import AppButton from "../Components/AppButton"
import AppTextInput from "../Components/AppTextInput"
import { SIGN_IN_PAGE } from "../Constants/screens"

export default function ForgotPassword({ navigation }) {
  const [page, setPage] = useState(true)
  const [username, setUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [code, setCode] = useState("")
  async function submitForgot() {
    try {
      await Auth.forgotPassword(username)
      setPage(false)
    } catch (error) {
      console.log(" Error with forgot password...", error)
    }
  }
  async function submitReset() {
    try {
      await Auth.forgotPasswordSubmit(username, code, newPassword)
      navigation.navigate(SIGN_IN_PAGE)
    } catch (error) {
      console.log(" Error with forgot password...", error)
    }
  }
  return (
    <SafeAreaView>
      {page ? (
        <View>
          <Text>Enter Username</Text>
          <AppTextInput
            value={username}
            onChangeText={(text) => setUsername(text)}
            leftIcon="account"
            placeholder="Enter username"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <AppButton title="Submit" onPress={submitForgot} />
          <AppButton
            title="Back To Login"
            onPress={() => navigation.navigate(SIGN_IN_PAGE)}
          />
        </View>
      ) : (
        <View>
          <AppButton title="Back" onPress={() => setPage(true)} />
          <Text>Enter New Password</Text>
          <AppTextInput
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            leftIcon="lock"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            textContentType="password"
          />
          <Text>Enter Verification Code Sent To Your Email</Text>
          <AppTextInput
            value={code}
            onChangeText={(text) => setCode(text)}
            leftIcon="numeric"
            placeholder="Enter verification code"
            keyboardType="numeric"
          />
          <AppButton title="Submit" onPress={submitReset} />
        </View>
      )}
    </SafeAreaView>
  )
}

import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Auth } from "aws-amplify"
import { SafeAreaView } from "react-native-safe-area-context"
import AppTextInput from "../Components/AppTextInput"
import AppButton from "../Components/AppButton"
import { LOADING_DATA } from "../Constants/constants"
import { SET_AUTH_STATUS, SET_AUTH_USER } from "../Constants/reducerEvents"
import { useDispatch, useSelector } from "react-redux"
import { PAGE_BACKGROUND_COLOR, PRIMARY_FONT } from "../Theme/theme.style"
import { FORGOT_PASSWORD_PAGE, SIGN_UP_PAGE } from "../Constants/screens"
export default function SignIn({ navigation, route }) {
  const [username, setUsername] = useState(
    route.params?.username ? route.params.username : ""
  )
  useEffect(() => {
    try {
      const username = route.params.username
      setUsername(username ? username : "")
    } catch (e) {}
  }, [route.params])
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  async function signIn() {
    try {
      dispatch({
        type: SET_AUTH_USER,
        payload: await Auth.signIn(username, password),
      })
      dispatch({ type: SET_AUTH_STATUS, payload: LOADING_DATA })
    } catch (error) {
      console.log(" Error signing in...", error)
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign in to your account</Text>
        <AppTextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        <AppButton title="Login" onPress={signIn} />

        <View style={styles.footerButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate(FORGOT_PASSWORD_PAGE)}
          >
            <Text style={styles.forgotPasswordButtonText}>Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(SIGN_UP_PAGE)}>
            <Text style={styles.forgotPasswordButtonText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: PAGE_BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    marginVertical: 15,
    fontFamily: PRIMARY_FONT,
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
})

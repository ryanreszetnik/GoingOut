import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Auth } from "aws-amplify"
import { SafeAreaView } from "react-native-safe-area-context"
import AppTextInput from "../Components/AppTextInput"
import AppButton from "../Components/AppButton"
import { SIGN_IN_PAGE } from "../Constants/screens"
export default function ConfirmSignUp({ navigation, route }) {
  const [username, setUsername] = useState(
    route.params?.username ? route.params.username : ""
  )
  useEffect(() => {
    try {
      const username = route.params.username
      setUsername(username ? username : "")
    } catch (e) {}
  }, [route.params])
  const [authCode, setAuthCode] = useState("")
  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode)
      console.log(" Code confirmed")
      navigation.navigate(SIGN_IN_PAGE, { username: username })
    } catch (error) {
      console.log(
        " Verification code does not match. Please enter a valid verification code.",
        error.code
      )
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Sign Up</Text>
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
          value={authCode}
          onChangeText={(text) => setAuthCode(text)}
          leftIcon="numeric"
          placeholder="Enter verification code"
          keyboardType="numeric"
        />
        <AppButton title="Confirm Sign Up" onPress={confirmSignUp} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#202020",
    fontWeight: "500",
    marginVertical: 15,
  },
})

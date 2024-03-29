import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Auth } from "aws-amplify"
import { SafeAreaView } from "react-native-safe-area-context"
import AppTextInput from "../../Components/AppTextInput"
import AppButton from "../../Components/AppButton"

export default function ConfirmSignUp({ navigation }) {
  const [authCode, setAuthCode] = useState("")

  async function confirmSignUp() {
    await Auth.verifyCurrentUserAttributeSubmit("email", authCode)
    try {
      console.log(" Code confirmed")
      navigation.navigate("View Profile")
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
          value={authCode}
          onChangeText={(text) => setAuthCode(text)}
          leftIcon="numeric"
          placeholder="Enter verification code"
          keyboardType="numeric"
        />
        <AppButton title="Confirm New Email" onPress={confirmSignUp} />
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

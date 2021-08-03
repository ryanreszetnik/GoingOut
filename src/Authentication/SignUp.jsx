import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native"
import { Auth } from "aws-amplify"
import { SafeAreaView } from "react-native-safe-area-context"
import AppTextInput from "../Components/AppTextInput"
import AppButton from "../Components/AppButton"
import GenderPicker from "../Components/GenderPicker"
import { CONFIRM_SIGN_UP_PAGE, SIGN_IN_PAGE } from "../Constants/screens"
export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [phone_number, setPhone] = useState("")
  const [gender, setGender] = useState("")
  //const [renderDate, setRender] = useState(false)
  const [birthdate, setBirthday] = useState("")
  const [name, setName] = useState("")

  async function signUp() {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, phone_number, gender, birthdate, name },
      })
      console.log(" Sign-up Confirmed")
      navigation.navigate(CONFIRM_SIGN_UP_PAGE, { username: username })
    } catch (error) {
      console.log(" Error signing up...", error)
    }
  }
  return (
    <ScrollView>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Create a new account</Text>
          <AppTextInput
            value={username}
            onChangeText={(text) => setUsername(text)}
            leftIcon="account"
            placeholder="Enter username"
            autoCapitalize="none"
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
          <AppTextInput
            value={name}
            onChangeText={(text) => setName(text)}
            leftIcon="form-textbox"
            placeholder="Enter Full Name"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {
            //For Future date picker
            /*<AppButton
            title='Select Date of Birth'
            onPress={() => {
              setRender(true)
            }}
          ></AppButton>*/
          }
          <AppTextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            leftIcon="email"
            placeholder="Enter Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />

          <AppTextInput
            value={birthdate}
            onChangeText={(text) => setBirthday(text)}
            placeholder="Enter Birthday"
            autoCapitalize="none"
          />
          <AppTextInput
            value={phone_number}
            onChangeText={(text) => setPhone(text)}
            leftIcon="phone"
            placeholder="Enter Phone Number"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />
          <GenderPicker checked={gender} setChecked={setGender}></GenderPicker>
          <AppButton title="Sign Up" onPress={signUp} />
          <View style={styles.footerButtonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(SIGN_IN_PAGE)}>
              <Text style={styles.forgotPasswordButtonText}>
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: "tomato",
    fontSize: 18,
    fontWeight: "600",
  },
})

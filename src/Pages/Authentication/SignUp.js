import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native"
import { Auth } from "aws-amplify"
import { SafeAreaView } from "react-native-safe-area-context"
import AppTextInput from "../../../Components/AppTextInput"
import AppButton from "../../../Components/AppButton"
import MonthPicker from "../../../Components/MonthPicker"
import { NavigationEvents } from "react-navigation"
import GenderPicker from "../../../Components/GenderPicker"
import DateSelector from "../../../Components/DateSelector"
import ImageSelector from "../../../Components/ImageSelector"
export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("")
  const [renderDate, setRender] = useState(false)
  const [birthday, setBirthday] = useState("")

  const submit = () => {
    const profile = { username, email, password, phone, gender, birthday }
    console.log(profile)
  }

  async function signUp() {
    try {
      await Auth.signUp({ username, password, attributes: { email } })
      console.log(" Sign-up Confirmed")
      navigation.navigate("ConfirmSignUp")
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
            leftIcon='account'
            placeholder='Enter username'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
          />
          <AppTextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            leftIcon='lock'
            placeholder='Enter password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
            textContentType='password'
          />
          <AppButton
            title='Select Date of Birth'
            onPress={() => {
              setRender(true)
            }}
          ></AppButton>
          <DateSelector
            render={renderDate}
            setRender={setRender}
            date={birthday}
            setDate={setBirthday}
          />
          <AppTextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            leftIcon='email'
            placeholder='Enter email'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
          />
          <AppTextInput
            value={phone}
            onChangeText={(text) => setPhone(text)}
            leftIcon='phone'
            placeholder='Enter Phone Number'
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='phone-pad'
            textContentType='telephoneNumber'
          />
          <GenderPicker checked={gender} setChecked={setGender}></GenderPicker>
          <AppButton title='Sign Up' onPress={submit} />
          <View style={styles.footerButtonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
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

import React from "react"
import { useState } from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { Auth } from "aws-amplify"
import { SET_AUTH_STATUS } from "../../Actions/authActions"
import { LOGGED_OUT } from "../../Constants/authConstants"
import { useDispatch, useSelector, useStore } from "react-redux"
import { updateUser } from "../../Endpoints/profileEndpoints"
import AppButton from "../../../Components/AppButton"
import AppTextInput from "../../../Components/AppTextInput"
//import ImageSelector from "../../../Components/ImageSelector"
import GenderPicker from "../../../Components/GenderPicker"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { SET_PROFILE } from "../../Actions/profileActions"

export default function EditProfile({ navigation }) {
  const user = useSelector((state) => state.userSession.user)
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const curEmail = profile.email
  const [email, setEmail] = useState(profile.email)
  const [phone_number, setPhone] = useState(profile.phone_number)
  const [gender, setGender] = useState(profile.gender)
  const [birthdate, setBirthday] = useState(profile.birthdate)
  const [name, setName] = useState(profile.name)

  async function signOut() {
    try {
      await Auth.signOut()
      dispatch({ type: SET_AUTH_STATUS, payload: LOGGED_OUT })
    } catch (error) {
      console.log("Error signing out: ", error)
    }
  }

  async function updateProfile() {
    const newUser = {
      email: email,
      birthdate: birthdate,
      phone_number: phone_number,
      gender: gender,
      name: name,
    }
    try {
      const newUserValues = await updateUser(newUser, user)
      console.log(newUserValues)
      dispatch({
        type: SET_PROFILE,
        payload: newUserValues,
      })
    } catch (error) {
      console.log(error)
    }

    if (email !== curEmail) {
      navigation.navigate("Confirm Email")
    } else {
      navigation.navigate("View Profile")
    }
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.imgTitle}>Change your profile picture</Text>
        {/*<ImageSelector />}*/}

        <View style={styles.editHeading}>
          <FontAwesome5
            name='edit'
            color='tomato'
            onPress={() => navigation.navigate("Edit Profile")}
            style={styles.icon}
          />
          <Text>Full Name</Text>
        </View>

        <AppTextInput
          value={name}
          onChangeText={(text) => setName(text)}
          leftIcon='emoticon-happy-outline'
          placeholder='Enter full name'
          autoCapitalize='none'
        />
        <View style={styles.editHeading}>
          <FontAwesome5 name='edit' color='tomato' style={styles.icon} />
          <Text>Email Address</Text>
        </View>
        <AppTextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon='email'
          placeholder='Enter Email'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
        />
        <View style={styles.editHeading}>
          <FontAwesome5 name='edit' color='tomato' style={styles.icon} />
          <Text>Date of Birth</Text>
        </View>
        <AppTextInput
          value={birthdate}
          onChangeText={(text) => setBirthday(text)}
          placeholder='Enter Birthday'
          autoCapitalize='none'
        />
        <View style={styles.editHeading}>
          <FontAwesome5 name='edit' color='tomato' style={styles.icon} />
          <Text>Phone Number</Text>
        </View>
        <AppTextInput
          value={phone_number}
          onChangeText={(text) => setPhone(text)}
          leftIcon='phone'
          placeholder='Enter Phone Number'
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='phone-pad'
          textContentType='telephoneNumber'
        />
        <GenderPicker checked={gender} setChecked={setGender}></GenderPicker>

        <AppButton title='Save Changes' onPress={updateProfile} />
        <AppButton title='Sign Out' onPress={signOut} />
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 5,
  },
  imgTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  editHeading: {
    marginVertical: 5,
    flexDirection: "row",
  },
  icon: {
    marginRight: 20,
  },
})

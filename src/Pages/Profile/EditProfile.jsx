import React, { useState, useEffect } from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { Auth } from "aws-amplify"
import {
  SET_AUTH_STATUS,
  SET_PROFILE,
  UPLOAD_IMAGE,
} from "../../Constants/reducerEvents"
import { LOGGED_OUT } from "../../Constants/constants"
import { batch, useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../Endpoints/profileEndpoints"
import AppButton from "../../Components/AppButton"
import AppTextInput from "../../Components/AppTextInput"
import ImageSelector from "../../Components/ImageSelector"
import GenderPicker from "../../Components/GenderPicker"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import AWS from "aws-sdk"
import { s3config } from "../../Constants/aws-exports"
import { getImageURIBySub } from "../../Utils/aws.utils"
import { decode } from "base64-arraybuffer"
import defaultImg from "../../../Assets/default-profile-pic.jpg"
import { PROFILE_CONFIRM_EMAIL, PROFILE_VIEW } from "../../Constants/screens"
import { PROFILE_EDIT_PROFILE } from "../../Constants/screens"

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
  const [imgSource, setImgSource] = useState(null)
  useEffect(() => {
    getImg()
  }, [])
  const getImg = async () => {
    setImgSource(await getImageURIBySub(user.attributes.sub))
  }

  async function signOut() {
    try {
      await Auth.signOut()
      dispatch({ type: SET_AUTH_STATUS, payload: LOGGED_OUT })
    } catch (error) {
      console.log("Error signing out: ", error)
    }
  }

  const uploadImageOnS3 = async () => {
    const s3bucket = new AWS.S3(s3config)
    const contentType = "image/jpeg"
    const contentDeposition = `inline;filename="${user.attributes.sub}"`
    const arrayBuffer = decode(imgSource.base64)

    s3bucket.createBucket(() => {
      const params = {
        Bucket: s3config.Bucket,
        Key: user.attributes.sub,
        Body: arrayBuffer,
        ContentDisposition: contentDeposition,
        ContentType: contentType,
      }
      s3bucket.upload(params, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log("sent", data)
        }
      })
    })
  }
  async function updateProfile() {
    const newUser = {
      email,
      birthdate,
      phone_number,
      gender,
      name,
    }
    if (imgSource) {
      await uploadImageOnS3()
    }
    try {
      const newUserValues = await updateUser(newUser)
      batch(() => {
        dispatch({
          type: SET_PROFILE,
          payload: newUserValues,
        })
        dispatch({
          type: UPLOAD_IMAGE,
          payload: imgSource,
        })
      })
    } catch (error) {
      console.log(error)
    }

    if (email !== curEmail) {
      navigation.navigate(PROFILE_CONFIRM_EMAIL)
    } else {
      navigation.navigate(PROFILE_VIEW)
    }
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.imgTitle}>Change your profile picture</Text>
        <ImageSelector
          source={imgSource}
          setSource={setImgSource}
          defaultSource={defaultImg}
        />

        <View style={styles.editHeading}>
          <FontAwesome5
            name="edit"
            color="tomato"
            onPress={() => navigation.navigate(PROFILE_EDIT_PROFILE)}
            style={styles.icon}
          />
          <Text>Full Name</Text>
        </View>

        <AppTextInput
          value={name}
          onChangeText={(text) => setName(text)}
          leftIcon="emoticon-happy-outline"
          placeholder="Enter full name"
          autoCapitalize="none"
        />
        <View style={styles.editHeading}>
          <FontAwesome5 name="edit" color="tomato" style={styles.icon} />
          <Text>Email Address</Text>
        </View>
        <AppTextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon="email"
          placeholder="Enter Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <View style={styles.editHeading}>
          <FontAwesome5 name="edit" color="tomato" style={styles.icon} />
          <Text>Date of Birth</Text>
        </View>
        <AppTextInput
          value={birthdate}
          onChangeText={(text) => setBirthday(text)}
          placeholder="Enter Birthday"
          autoCapitalize="none"
        />
        <View style={styles.editHeading}>
          <FontAwesome5 name="edit" color="tomato" style={styles.icon} />
          <Text>Phone Number</Text>
        </View>
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

        <AppButton title="Save Changes" onPress={updateProfile} />
        <AppButton title="Sign Out" onPress={signOut} />
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

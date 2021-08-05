import React, { useState, useEffect } from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { SET_PROFILE, UPLOAD_IMAGE } from "../../Constants/reducerEvents"
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
import CalendarPicker from "react-native-calendar-picker"
import MonthPicker from "../../Components/MonthPicker"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"
import moment from "moment"

export default function EditProfile({ navigation }) {
  const user = useSelector((state) => state.userSession.user)
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const curEmail = profile.email
  const [email, setEmail] = useState(profile.email)
  const [bio, setBio] = useState(profile.bio)
  const [gender, setGender] = useState(profile.gender)
  const [birthdate, setBirthday] = useState(new Date(profile.birthdate))
  const [name, setName] = useState(profile.name)
  const [imgSource, setImgSource] = useState(null)
  useEffect(() => {
    getImg()
  }, [])
  const getImg = async () => {
    setImgSource(await getImageURIBySub(user.attributes.sub))
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
      birthdate: moment(birthdate).format("YYYY-MM-DD"),
      bio,
      gender,
      name,
    }

    if (imgSource && imgSource.base64) {
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
    <ScrollView style={{ backgroundColor: "#111" }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.imgTitle}>Change your profile picture</Text>
        <ImageSelector
          source={imgSource}
          setSource={setImgSource}
          defaultSource={defaultImg}
        />

        <View style={styles.editHeading}>
          <FontAwesome5
            name='edit'
            color='white'
            onPress={() => navigation.navigate(PROFILE_EDIT_PROFILE)}
            style={styles.icon}
          />
          <Text style={styles.text}>Full Name</Text>
        </View>

        <AppTextInput
          value={name}
          onChangeText={(text) => setName(text)}
          leftIcon='emoticon-happy-outline'
          placeholder='Enter full name'
          autoCapitalize='none'
        />
        <View style={styles.editHeading}>
          <FontAwesome5 name='edit' color='white' style={styles.icon} />
          <Text style={styles.text}>Email Address</Text>
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

        <GenderPicker checked={gender} setChecked={setGender}></GenderPicker>
        <View style={styles.editHeading}>
          <FontAwesome5 name='edit' color='white' style={styles.icon} />
          <Text style={styles.text}>Date of Birth</Text>
        </View>
        <ScrollView
          style={{
            backgroundColor: "#2C2C2C",
            borderRadius: 10,
            marginVertical: 10,
          }}
        >
          <CalendarPicker
            scrollable={true}
            selectedDayStyle={{
              backgroundColor: "white",
            }}
            yearTitleStyle={{
              color: "white",
              marginLeft: 10,
              padding: 5,
              borderRadius: 20,
              textAlign: "center",
              backgroundColor: "gray",
              width: 100,
              fontFamily: "SF Pro Display",
              marginVertical: 10,
            }}
            monthTitleStyle={{
              color: "white",
              padding: 5,
              marginVertical: 10,
              borderRadius: 20,
              textAlign: "center",
              backgroundColor: "gray",
              width: 100,
              fontFamily: "SF Pro Display",
            }}
            previousComponent={
              <FontAwesome5Icon name='chevron-left' color='white' size={20} />
            }
            nextComponent={
              <FontAwesome5Icon name='chevron-right' color='white' size={20} />
            }
            textStyle={{ color: "white", fontFamily: "SF Pro Display" }}
            onDateChange={(date) => {
              setBirthday(date)
            }}
            initialDate={moment(birthdate)}
          />
        </ScrollView>

        <AppButton title='Save Changes' onPress={updateProfile} />
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
    color: "white",
  },
  editHeading: {
    marginTop: 25,
    flexDirection: "row",
  },
  icon: {
    marginRight: 20,
  },
  text: {
    fontFamily: "SF Pro Display",
    color: "white",
    fontSize: 16,
  },
})

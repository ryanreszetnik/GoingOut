import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import ImagePicker from "react-native-image-crop-picker"
import defaultImg from "../../Assets/default-profile-pic.jpg"
import { PRIMARY_FONT } from "../Theme/theme.style"

export default function ImageSelector({ source, setSource }) {
  const chooseImg = () => {
    const options = {
      maxWidth: 256,
      maxHeight: 256,
      mediaType: "photo",
      includeBase64: true,
    }

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      includeBase64: true,
      mediaType: "photo",
      forceJpg: true,
    })
      .then((image) => {
        console.log(image.sourceURL, image.data.length, Object.keys(image))
        var base64Icon = `data:image/png;base64,${image.data}`
        setSource({ uri: base64Icon, base64: image.data })
      })
      .catch((e) => {})
  }

  const takeImg = () => {
    const options = {
      mediaType: "photo",
      savetoPhotos: "true",
      includeBase64: true,
      type: "image/jpeg",
    }
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      includeBase64: true,
      mediaType: "photo",
      forceJpg: true,
    })
      .then((image) => {
        console.log(image.sourceURL, image.data.length, Object.keys(image))
        var base64Icon = `data:image/png;base64,${image.data}`
        setSource({ uri: base64Icon, base64: image.data })
      })
      .catch((e) => {})
  }
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={source} defaultSource={defaultImg} />
      <View style={styles.buttonList}>
        <TouchableOpacity style={styles.button} onPress={chooseImg}>
          <Text style={styles.buttonText}>Choose photo from camera roll</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takeImg}>
          <Text style={styles.buttonText}>Take photo using camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#2C2C2C",
    width: "100%",
    borderRadius: 10,
  },
  image: {
    borderColor: "gray",
    borderWidth: 1,
    width: 150,
    height: 150,
    borderRadius: 100,
    marginVertical: 10,
    marginLeft: 10,
    backgroundColor: "white",
  },
  buttonList: {
    justifyContent: "center",
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    margin: 10,
    marginLeft: 15,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: PRIMARY_FONT,
  },
})

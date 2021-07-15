import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import ImagePicker from "react-native-image-crop-picker"

export default function ImageSelector({ source, setSource }) {
  const chooseImg = () => {
    const options = {
      maxWidth: 256,
      maxHeight: 256,
      mediaType: "photo",
      includeBase64: true,
    }
    console.log("launching")
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      includeBase64: true,
      mediaType: "photo",
      forceJpg: true,
    }).then((image) => {
      console.log(image.sourceURL, image.data.length, Object.keys(image))
      var base64Icon = `data:image/png;base64,${image.data}`
      setSource({ uri: base64Icon, base64: image.data })
    })
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
    }).then((image) => {
      console.log(image.sourceURL, image.data.length, Object.keys(image))
      var base64Icon = `data:image/png;base64,${image.data}`
      setSource({ uri: base64Icon, base64: image.data })
    })
  }
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={source} />
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
    backgroundColor: "lightgray",
  },
  image: {
    borderColor: "gray",
    borderWidth: 1,
    width: 100,
    height: 100,
    margin: "4%",
    marginLeft: 25,
    backgroundColor: "white",
  },
  buttonList: {
    justifyContent: "center",
  },
  button: {
    backgroundColor: "tomato",
    padding: 10,
    margin: 10,
    marginLeft: 45,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
})

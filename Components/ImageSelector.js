import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"

export default function ImageSelector({ source, setSource }) {
  const chooseImg = () => {
    const options = {
      maxWidth: 256,
      maxHeight: 256,
      mediaType: "photo",
    }

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("cancel")
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error)
      } else {
        setSource({ uri: response.assets.uri })
      }
    })
  }

  const takeImg = () => {
    const options = {
      mediaType: "photo",
      savetoPhotos: "true",
    }

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("cancel")
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error)
      } else {
        setSource({ uri: response.assets.uri })
      }
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

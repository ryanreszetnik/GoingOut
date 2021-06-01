import React from "react"
import { View, Text, Image } from "react-native"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import AppButton from "./AppButton"

export default function ImageSelector() {
  return (
    <View>
      <Image />
      <AppButton
        title='Select Profile Picture from Camera Roll'
        onPress={launchImageLibrary}
      />
      <AppButton
        title='Take Profile Picture with Camera'
        onPress={launchCamera}
      />
    </View>
  )
}

import React from "react"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import LocationAd from "../../CommonPages/LocationAd"
import AppButton from "../../Components/AppButton"

export default function PotentialLocation({ route, navigation }) {
  const { location, currentLocation, callBack } = route.params

  const onSelect = () => {
    console.log("Update info")
    callBack(location)
    navigation.pop(1)
  }
  return (
    <View>
      <LocationAd
        location={location}
        currentLocation={currentLocation}
        onSelect={onSelect}
      />
    </View>
  )
}

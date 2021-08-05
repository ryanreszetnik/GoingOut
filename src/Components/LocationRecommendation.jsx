import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { getDistanceBetweenLocations } from "../Utils/location.utils"

export default function LocationRecommendation({
  currentLoc,
  recomendation,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "100%",
        height: 50,
        backgroundColor: "#DDD",
        marginVertical: 2,
      }}
    >
      <Text>{recomendation.name}</Text>
      <Text>{`${getDistanceBetweenLocations(
        currentLoc,
        recomendation.loc
      )} km away`}</Text>
    </TouchableOpacity>
  )
}

import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { getDistanceBetweenLocations } from "../Utils/location.utils"

export default function LocationRecommendation({
  currentLoc,
  recomendation,
  onPress,
  showDistance = true,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "100%",
        height: 60,
        backgroundColor: "#333",
        marginVertical: 2,
      }}
    >
      <Text style={{ color: "white" }}>{recomendation.name}</Text>
      <Text style={{ color: "white" }}>{recomendation.address}</Text>
      {showDistance && (
        <Text style={{ color: "white" }}>{`${getDistanceBetweenLocations(
          currentLoc,
          recomendation
        )} km away`}</Text>
      )}
    </TouchableOpacity>
  )
}

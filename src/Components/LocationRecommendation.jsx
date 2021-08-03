import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

export default function LocationRecommendation({
  currentLoc,
  recomendation,
  onPress,
}) {
  const getDistanceFromLatLonInKm = () => {
    var R = 6371 // Radius of the earth in km
    var dLat = deg2rad(currentLoc.lat - recomendation.loc.lat) // deg2rad below
    var dLon = deg2rad(currentLoc.lon - recomendation.loc.lon)
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(recomendation.loc.lat)) *
        Math.cos(deg2rad(currentLoc.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c // Distance in km
    if (d < 10) {
      return Math.round(d * 10) / 10
    }
    return Math.round(d)
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "100%",
        height: 50,
        backgroundColor: "green",
        marginVertical: 1,
      }}
    >
      <Text>{recomendation.name}</Text>
      <Text>{`${getDistanceFromLatLonInKm()} km away`}</Text>
    </TouchableOpacity>
  )
}

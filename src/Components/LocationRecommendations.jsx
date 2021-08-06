import React, { useState } from "react"
import { useEffect } from "react"
import { View, Text } from "react-native"
import { getNearbyLocations } from "../Endpoints/eventEndpoints"
import LocationRecommendation from "./LocationRecommendation"

export default function LocationRecommendations({ loc, onPress }) {
  const [recs, setRecs] = useState([])
  useEffect(() => {
    getRecommendations()
  }, [loc])
  const getRecommendations = async () => {
    console.log(`Getting Recommendations near lat:${loc.lat} lon:${loc.lon}`)
    setRecs(await getNearbyLocations(loc))
  }
  return (
    <View>
      {recs.map((rec) => (
        <LocationRecommendation
          currentLoc={loc}
          recomendation={rec}
          key={Math.random()}
          onPress={() => onPress(rec)}
        />
      ))}
    </View>
  )
}

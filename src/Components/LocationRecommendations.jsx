import React, { useState } from "react"
import { useEffect } from "react"
import { View, Text } from "react-native"
import LocationRecommendation from "./LocationRecommendation"

export default function LocationRecommendations({ loc }) {
  const [recs, setRecs] = useState([
    { name: "Dirty Dogs", loc: { lat: 0, lon: 0 } },
    { name: "Warehouse", loc: { lat: 0, lon: 0 } },
  ])
  useEffect(() => {
    getRecommendations()
  }, [loc])
  const getRecommendations = () => {
    console.log(`Getting Recommendations near lat:${loc.lat} lon:${loc.lon}`)
  }
  return (
    <View>
      {recs.map((rec) => (
        <LocationRecommendation
          currentLoc={loc}
          recomendation={rec}
          key={Math.random()}
        />
      ))}
    </View>
  )
}

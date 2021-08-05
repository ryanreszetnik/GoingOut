import React from "react"
import { View, Text, Image } from "react-native"
import { Marker } from "react-native-maps"
import MarkerImage from "../../Assets/Marker.png"
export default function CustomMarker({ coordinate, label }) {
  const isShown = label && label.length > 0
  return (
    <Marker coordinate={coordinate}>
      <View style={{ alignContent: "center", alignItems: "center" }}>
        <Text
          style={{
            backgroundColor: `rgba(255,255,255,${isShown ? 0.85 : 0})`,
            padding: 3,
          }}
        >
          {label}
        </Text>

        <Image style={{ width: 30, height: 40 }} source={MarkerImage} />
      </View>
    </Marker>
  )
}

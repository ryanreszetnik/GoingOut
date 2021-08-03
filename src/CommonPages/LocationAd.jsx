import React from "react"
import { View, Text } from "react-native"

export default function LocationAd({ route }) {
  const { location } = route.params
  return (
    <View>
      <Text>Location Ad for {JSON.stringify(location)}</Text>
    </View>
  )
}

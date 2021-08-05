import React from "react"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import LocationAd from "../../CommonPages/LocationAd"
import AppButton from "../../Components/AppButton"

export default function PotentialLocation({ route }) {
  const { location, eventId, callBack } = route.params
  const event = useSelector((state) =>
    state.events.find((e) => e.eventId === eventId)
  )
  const onSelect = () => {
    console.log("Update info")
    callBack(location)
  }
  return (
    <View>
      <LocationAd
        location={location}
        currentLoc={event ? event.loc : null}
        onSelect={onSelect}
      />
    </View>
  )
}

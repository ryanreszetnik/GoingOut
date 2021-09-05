import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"
import { getDistanceBetweenLocations } from "../Utils/location.utils"

import CustomMarker from "../Components/CustomMarker"
import AppButton from "../Components/AppButton"
import Fontawesome from "react-native-vector-icons/FontAwesome5"

export default function LocationAd({ route, navigation }) {
  const { location, currentLocation, callBack } = route.params
  const onSelect = () => {
    console.log("Update info")

    navigation.pop(1)
    callBack(location)
  }
  const distance = currentLocation
    ? getDistanceBetweenLocations(currentLocation, location)
    : 10

  const description =
    "This is some super long description that advertisers could write to give a nice description of what their place is"
  console.log(currentLocation, location)
  return (
    <View>
      <View style={{ alignContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 30, fontWeight: "600" }}>{location.name}</Text>
        {currentLocation && (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Fontawesome name="route" size={20} style={{ paddingRight: 8 }} />
            <Text style={{ fontSize: 17 }}>{`${distance} km away`}</Text>
          </View>
        )}
        <View style={{ padding: 5 }}>
          <Text>{description}</Text>
        </View>
        {currentLocation && (
          <AppButton title="Select This Location" onPress={onSelect} />
        )}
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: distance / 50,
          longitudeDelta: distance / 50,
        }}
        scrollEnabled={true}
        style={styles.map}
      >
        {currentLocation && (
          <CustomMarker coordinate={currentLocation} label="Old Location" />
        )}
        <CustomMarker coordinate={location} label={location.name} />
      </MapView>
      <View>
        <Text>Any Specials Here</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  map: { width: "100%", height: 250 },
})

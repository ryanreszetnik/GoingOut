import React from "react"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import AppButton from "../../Components/AppButton"
import AppTextInput from "../../Components/AppTextInput"
import CustomMarker from "../../Components/CustomMarker"
import LocationRecommendation from "../../Components/LocationRecommendation"
import { EVENTS_POTENTIAL_LOCATION } from "../../Constants/screens"
import { getNearbyLocations } from "../../Endpoints/eventEndpoints"

export default function LocationSelection({ route, navigation }) {
  const { callBack } = route.params
  const [loc, setLoc] = useState({
    lat: 43.6532,
    lon: -79.3832,
  })
  const [nearby, setNearby] = useState([])
  const [manual, setManual] = useState(true)
  const [name, setName] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [currentLocation, setCurrentLocation] = useState(null)
  const [address, setAddress] = useState("")
  const [shownLocation, setShownLocation] = useState({
    latitude: 43.6532,
    longitude: -79.3832,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  })
  const mapRef = useRef()
  useEffect(() => {
    loadNewLocations()
  }, [loc])
  const loadNewLocations = async () => {
    setNearby(await getNearbyLocations(loc))
  }
  const updateLocation = (latitude, longitude) => {
    console.log("Setting location", latitude, longitude)
    setLoc({
      lat: latitude,
      lon: longitude,
    })
    setShownLocation({
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    })
    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    )
  }
  const submit = () => {
    let data = {}
    if (manual) {
      data = {
        lat: loc.lat,
        lon: loc.lon,
        locName: name,
        address,
        locationId: null,
      }
    } else {
      data = {
        lat: currentLocation.loc.lat,
        lon: currentLocation.loc.lon,
        locName: currentLocation.name,
        address: currentLocation.address,
        locationId: currentLocation.locationId,
      }
    }
    navigation.pop(1)
    callBack(data)
  }
  const selectManualLocation = (location) => {
    console.log("Manual", location)
    setCurrentLocation(null)
    setDisplayName(name)
    updateLocation(location.latitude, location.longitude)
    setManual(true)
  }
  const selectAdLocation = (location) => {
    console.log("Preset", location.loc)
    setCurrentLocation(location)
    setDisplayName(location.name)
    updateLocation(location.loc.lat, location.loc.lon)
    setManual(false)
  }
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: loc.lat,
          longitude: loc.lon,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={styles.map}
        ref={mapRef}
        onPress={(e) => {
          selectManualLocation(e.nativeEvent.coordinate)
        }}
      >
        <CustomMarker
          coordinate={shownLocation}
          label={`${displayName}`}
        ></CustomMarker>
      </MapView>
      {manual ? (
        <View>
          <AppTextInput
            value={name}
            onChangeText={(text) => {
              setName(text)
              setDisplayName(text)
            }}
            leftIcon="map-marker"
            placeholder="Enter Location Name"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <AppTextInput
            value={address}
            onChangeText={(text) => {
              setAddress(text)
            }}
            leftIcon="map-marker"
            placeholder="Enter Location Details/Address"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        </View>
      ) : (
        <View>
          <Text>Selected Location</Text>
          <LocationRecommendation
            currentLoc={loc}
            recomendation={currentLocation}
            onPress={() => {
              navigation.navigate(EVENTS_POTENTIAL_LOCATION, {
                location: currentLocation,
              })
            }}
          />
        </View>
      )}
      <AppButton title="Confirm" onPress={submit} />
      <View style={styles.recomendations}>
        {nearby
          .filter(
            (l) =>
              currentLocation === null ||
              l.locationId !== currentLocation.locationId
          )
          .map((location) => {
            return (
              <LocationRecommendation
                currentLoc={loc}
                recomendation={location}
                onPress={() => {
                  navigation.navigate(EVENTS_POTENTIAL_LOCATION, {
                    location: location,
                    currentLoc: shownLocation,
                    callBack: selectAdLocation,
                  })
                }}
              />
            )
          })}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  map: { width: "100%", height: 250 },
  recomendations: { borderTopWidth: 1, paddingTop: 2, marginTop: 5 },
})

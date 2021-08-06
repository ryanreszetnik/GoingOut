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
import { PAGE_BACKGROUND_COLOR } from "../../Theme/theme.style"

export default function LocationSelection({ route, navigation }) {
  const { callBack, initialLocation } = route.params
  const [location, setLocation] = useState(initialLocation)
  const [nearby, setNearby] = useState([])
  const [manual, setManual] = useState(true)
  const [name, setName] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [currentLocation, setCurrentLocation] = useState(null)
  const [address, setAddress] = useState("")

  useEffect(() => {
    setLocation({
      latitude: initialLocation.latitude,
      longitude: initialLocation.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    })
    if (initialLocation.locationId) {
      setCurrentLocation(initialLocation)
      setManual(false)
    } else {
      setName(initialLocation.name)
      setAddress(initialLocation.address)
    }
    setDisplayName(initialLocation.name)
  }, [initialLocation])
  const mapRef = useRef()
  useEffect(() => {
    loadNewLocations()
  }, [location])
  const loadNewLocations = async () => {
    const newNearby = await getNearbyLocations(location)
    console.log("getting nearby", newNearby)
    setNearby(newNearby)
  }
  const updateLocation = (latitude, longitude) => {
    console.log("Setting location", latitude, longitude)
    setLocation({
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
        latitude: location.latitude,
        longitude: location.longitude,
        name: name,
        address,
        locationId: null,
      }
    } else {
      data = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        name: currentLocation.name,
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
    console.log("Preset", location)
    setCurrentLocation(location)
    setDisplayName(location.name)
    updateLocation(location.latitude, location.longitude)
    setManual(false)
  }
  return (
    <View style={{ backgroundColor: PAGE_BACKGROUND_COLOR, height: "100%" }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
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
          coordinate={location}
          label={`${displayName}`}
        ></CustomMarker>
      </MapView>
      {manual ? (
        <View style={{ paddingTop: 3 }}>
          <View style={styles.textContainer}>
            <AppTextInput
              value={name}
              label="Name"
              required
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
          </View>
          <View style={styles.textContainer}>
            <AppTextInput
              label="Address"
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
        </View>
      ) : (
        <View>
          <Text style={{ color: "white" }}>Selected Location:</Text>
          <LocationRecommendation
            currentLoc={location}
            showDistance={false}
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
          .map((recomendation) => {
            return (
              <LocationRecommendation
                currentLoc={location}
                recomendation={recomendation}
                onPress={() => {
                  navigation.navigate(EVENTS_POTENTIAL_LOCATION, {
                    location: recomendation,
                    currentLocation: location,
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
  textContainer: { paddingVertical: 2 },
})

import React from "react"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import AppButton from "../Components/AppButton"
import AppTextInput from "../Components/AppTextInput"
import CustomMarker from "../Components/CustomMarker"
import LocationRecommendation from "../Components/LocationRecommendation"
import { EVENTS_POTENTIAL_LOCATION } from "../Constants/screens"
import { getNearbyLocations } from "../Endpoints/eventEndpoints"
import { PAGE_BACKGROUND_COLOR } from "../Theme/theme.style"
import { getLocationAd } from "../Utils/page.utils"

export default function LocationSelection({ route, navigation }) {
  const { callBack, initialLocation } = route.params
  const [location, setLocation] = useState(initialLocation)
  const [newAdLocation, setNewAdLocation] = useState(null)
  const [nearby, setNearby] = useState([])
  const [name, setName] = useState(
    initialLocation.locationId === null ? initialLocation.name : ""
  )
  const [address, setAddress] = useState(
    initialLocation.locationId === null ? initialLocation.address : ""
  )
  const potentialLocationPage = getLocationAd(route.name)
  const mapRef = useRef()
  const updateName = (newName) => {
    setName(newName)
    setLocation((loc) => {
      return { ...loc, name: newName }
    })
  }
  const updateAddress = (newAddress) => {
    setAddress(newAddress)
    setLocation((loc) => {
      return { ...loc, address: newAddress }
    })
  }
  useEffect(() => {
    loadNewLocations()
  }, [location])
  const loadNewLocations = async () => {
    const newNearby = await getNearbyLocations(location)
    setNearby(newNearby)
  }

  const updateLocation = (newLocation) => {
    console.log("Setting location", newLocation)
    setLocation(newLocation)

    mapRef.current?.animateToRegion(
      {
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    )
  }
  const submit = () => {
    navigation.pop(1)
    callBack(location)
  }
  const selectManualLocation = (location) => {
    console.log("Manual", location)
    setNewAdLocation(null)
    updateLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      name,
      address,
      locationId: null,
    })
  }
  const selectAdLocation = (location) => {
    console.log("Preset", location)
    setNewAdLocation(location)
    updateLocation(location)
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
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          label={`${location.name}`}
        ></CustomMarker>
      </MapView>
      {location.locationId === null ? (
        <View style={{ paddingTop: 3 }}>
          <View style={styles.textContainer}>
            <AppTextInput
              value={name}
              label="Name"
              required
              onChangeText={(text) => {
                updateName(text)
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
                updateAddress(text)
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
            showDistance={false}
            recomendation={location}
            onPress={() => {
              navigation.navigate(potentialLocationPage, {
                location,
              })
            }}
          />
        </View>
      )}
      <AppButton title="Confirm" onPress={submit} />
      <View style={styles.recomendations}>
        {nearby
          .filter((l) => l.locationId !== location.locationId)
          .map((recomendation) => {
            return (
              <LocationRecommendation
                key={recomendation.locationId}
                currentLoc={location}
                recomendation={recomendation}
                onPress={() => {
                  navigation.push(potentialLocationPage, {
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

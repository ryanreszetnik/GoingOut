import React, { useState } from "react"
import MultiSlider from "@ptomasroos/react-native-multi-slider"
import { Platform, View, Text, StyleSheet } from "react-native"
import { ACCENT_COLOR, CONTAINER_COLOR } from "../Theme/theme.style"

const optionsArray = [
  ...[...Array(38).keys()].map((k) => k + 18),
  60,
  65,
  70,
  75,
  80,
  85,
  90,
  95,
  100,
]

const AgeRange = ({ ageRange, setAgeRange }) => {
  const multiSliderValuesChange = (values) =>
    setAgeRange({ minAge: values[0], maxAge: values[1] })

  return (
    <View style={styles.ViewContainer}>
      <View style={styles.Labelwrapper}>
        <Text
          style={styles.sliderTxt}
        >{`Age Range: ${ageRange.minAge}-${ageRange.maxAge}`}</Text>
      </View>
      <View style={styles.sliderContainer}>
        <MultiSlider
          markerStyle={{
            ...Platform.select({
              ios: {
                height: 28,
                width: 28,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 1,
                shadowOpacity: 0.1,
              },
              android: {
                height: 28,
                width: 28,
                borderRadius: 50,
                backgroundColor: "#1792E8",
              },
            }),
          }}
          pressedMarkerStyle={{
            ...Platform.select({
              android: {
                height: 28,
                width: 28,
                borderRadius: 20,
                backgroundColor: "#148ADC",
              },
            }),
          }}
          selectedStyle={{
            backgroundColor: ACCENT_COLOR,
          }}
          trackStyle={{
            backgroundColor: "#CECECE",
          }}
          touchDimensions={{
            height: 40,
            width: 40,
            borderRadius: 20,
            slipDisplacement: 40,
          }}
          values={[ageRange.minAge, ageRange.maxAge]}
          sliderLength={280}
          optionsArray={optionsArray}
          onValuesChange={multiSliderValuesChange}
          allowOverlap={false}
          minMarkerOverlapDistance={28}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ViewContainer: {
    alignSelf: "center",
    justifyContent: "center",
    margin: 3,
    paddingTop: 8,
    marginLeft: 10,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: CONTAINER_COLOR,
  },
  Labelwrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
  },
  sliderContainer: {
    alignItems: "center",
  },
  sliderTxt: {
    fontSize: 15,
    width: "100%",
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
})
export default AgeRange

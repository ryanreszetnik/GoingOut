import React, { useState } from "react"
import MultiSlider from "@ptomasroos/react-native-multi-slider"
import { Platform, View, Text, StyleSheet } from "react-native"

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
      <View style={styles.SliderWrapper}>
        <View style={styles.Labelwrapper}>
          <Text style={styles.sliderTxt}>
            {ageRange.minAge} {`     Min Age`}{" "}
          </Text>
          <Text style={styles.sliderTxt}>
            {`Max Age    `}
            {ageRange.maxAge}
          </Text>
        </View>
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
            backgroundColor: "#1792E8",
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
  SliderWrapper: {
    margin: 0,
    width: 280,
    height: 150,
    justifyContent: "center",
  },

  ViewContainer: {
    alignSelf: "center",
    justifyContent: "center",
  },
  Labelwrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
  },
  sliderTxt: {
    fontSize: 15,
  },
})
export default AgeRange

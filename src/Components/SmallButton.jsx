import React from "react"
import { View, Text, TouchableOpacity, Animated } from "react-native"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"

export default function SmallButton({
  size,
  icon,
  text,
  onPress,
  style,
  textStyle,
  disabled,
  animatedValue,
  opacityAnimator,
}) {
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity)
  const AnimatedFontAwesome5Icon =
    Animated.createAnimatedComponent(FontAwesome5Icon)
  {
    return !disabled ? (
      <View style={{ alignContent: "center", alignItems: "center", ...style }}>
        <AnimatedTouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: "#2C2C2C",
            width: size,
            height: size,
            borderRadius: size,
            transform: animatedValue,
            opacity: opacityAnimator,
          }}
        >
          <AnimatedFontAwesome5Icon
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "auto",
              marginBottom: "auto",
              transform: animatedValue,
              opacity: opacityAnimator,
            }}
            size={size * 0.45}
            name={icon}
            color='white'
            solid
          />
        </AnimatedTouchableOpacity>
        <Text style={textStyle}>{text}</Text>
      </View>
    ) : (
      <View style={{ alignContent: "center", alignItems: "center", ...style }}>
        <Animated.View
          onPress={() => {}}
          style={{
            backgroundColor: "#1F1F1F",
            width: size,
            height: size,
            borderRadius: size,
            transform: animatedValue,
            opacity: opacityAnimator,
          }}
        >
          <AnimatedFontAwesome5Icon
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "auto",
              marginBottom: "auto",
              transform: animatedValue,
              opacity: opacityAnimator,
            }}
            size={size * 0.45}
            name={icon}
            color='white'
          />
        </Animated.View>
        <Text style={textStyle}>{text}</Text>
      </View>
    )
  }
}

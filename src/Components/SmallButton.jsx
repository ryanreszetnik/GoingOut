import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"

export default function SmallButton({ size, icon, text, onPress, style = {} }) {
  return (
    <View style={{ alignContent: "center", alignItems: "center", ...style }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: "#AAA",
          width: size,
          height: size,
          borderRadius: size,
        }}
      >
        <FontAwesome5Icon
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "auto",
            marginBottom: "auto",
          }}
          size={size * 0.6}
          name={icon}
          color="#333"
        />
      </TouchableOpacity>
      <Text>{text}</Text>
    </View>
  )
}

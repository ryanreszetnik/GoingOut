import React from "react"
import { View, Text } from "react-native"
import { Switch } from "react-native-paper"
import { ACCENT_COLOR, CONTAINER_COLOR } from "../Theme/theme.style"
export default function AppSwitch({ label, value, onChange }) {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 3,
      }}
    >
      <View
        style={{
          backgroundColor: CONTAINER_COLOR,
          borderRadius: 10,
          padding: 7,
          paddingHorizontal: 10,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "500",
            paddingRight: 10,
          }}
        >
          {label}
        </Text>
        <View
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Switch
            color={ACCENT_COLOR}
            ios_backgroundColor="#888"
            value={value}
            onValueChange={onChange}
          />
        </View>
      </View>
    </View>
  )
}

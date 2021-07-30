import React, { createRef } from "react"
import { View, Text } from "react-native"

export const navigationRef = createRef()

export function navigate(name) {
  navigationRef.current?.navigate(name)
}

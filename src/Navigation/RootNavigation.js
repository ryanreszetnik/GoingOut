import { StackActions } from "@react-navigation/native"
import { createRef } from "react"

export const navigationRef = createRef()

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params)
}
export function push(name, params) {
  navigationRef.current?.dispatch(StackActions.push(name, params))
}

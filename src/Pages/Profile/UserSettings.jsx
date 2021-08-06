import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { Auth } from "aws-amplify"
import { SET_AUTH_STATUS } from "../../Constants/reducerEvents"
import { LOGGED_OUT } from "../../Constants/constants"
import { useDispatch } from "react-redux"
import AppButton from "../../Components/AppButton"
import { Button, Overlay } from "react-native-elements"
import { PAGE_BACKGROUND_COLOR, PRIMARY_FONT } from "../../Theme/theme.style"

export default function UserSettings() {
  const dispatch = useDispatch()
  const [overlay, setOverlay] = useState(false)
  async function signOut() {
    try {
      await Auth.signOut()
      dispatch({ type: SET_AUTH_STATUS, payload: LOGGED_OUT })
    } catch (error) {
      console.log("Error signing out: ", error)
    }
  }
  return (
    <ScrollView style={{ backgroundColor: PAGE_BACKGROUND_COLOR }}>
      <View style={styles.buttonContainer}>
        <AppButton
          title="sign out"
          onPress={() => {
            setOverlay(!overlay)
          }}
        ></AppButton>
      </View>
      <Overlay
        isVisible={overlay}
        onBackdropPress={() => {
          setOverlay(!overlay)
        }}
        overlayStyle={{
          backgroundColor: "#2C2C2C",
          borderRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            color: "white",
            fontFamily: PRIMARY_FONT,
          }}
        >
          Are you sure you want to sign out?
        </Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Button
            buttonStyle={styles.requestButton}
            title="Yes"
            titleStyle={{
              color: "white",
              textAlign: "center",
              fontFamily: PRIMARY_FONT,
            }}
            onPress={() => {
              signOut()
            }}
          ></Button>
          <Button
            buttonStyle={styles.requestButton}
            title="No"
            titleStyle={{
              color: "white",
              textAlign: "center",
              fontFamily: PRIMARY_FONT,
            }}
            onPress={() => {
              setOverlay(!overlay)
            }}
          >
            {" "}
          </Button>
        </View>
      </Overlay>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
  },
  requestButton: {
    backgroundColor: "#555",
    padding: 4,
    margin: 8,
    width: 150,
    borderRadius: 10,
  },
})

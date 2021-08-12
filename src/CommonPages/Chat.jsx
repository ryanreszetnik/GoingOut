import React, { useRef, useState } from "react"
import { View, Text, StyleSheet, TextInput } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"

import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { useSelector } from "react-redux"
import AppTextInput from "../Components/AppTextInput"
import ChatMessage from "../Components/ChatMessage"
import {
  ACCENT_COLOR,
  CONTAINER_COLOR,
  PAGE_BACKGROUND_COLOR,
} from "../Theme/theme.style"

export default function Chat({ messages, sendMessage }) {
  const scrollViewRef = useRef()
  const [input, setInput] = useState("")
  const username = useSelector((state) => state.profile.username)
  const sendMessageClicked = () => {
    if (input.length > 0) {
      sendMessage(input)
      setInput("")
    }
  }
  return (
    <View style={styles.page}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        style={styles.messageView}
      >
        {messages.map((mess) => (
          <ChatMessage
            message={mess.message}
            sender={mess.sender.username === username}
            author={mess.sender.name}
            key={mess.messageId}
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            value={input}
            onChangeText={(text) => setInput(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessageClicked}
        >
          <FontAwesome5
            style={{ marginRight: 20 }}
            size={35}
            name="arrow-circle-up"
            color={ACCENT_COLOR}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  page: {
    height: "100%",
    backgroundColor: PAGE_BACKGROUND_COLOR,
  },
  inputContainer: {
    height: 45,
    backgroundColor: CONTAINER_COLOR,
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: "row",
  },
  input: {
    backgroundColor: CONTAINER_COLOR,
    borderRadius: 45,
    paddingHorizontal: 10,
    borderColor: "#888",
    borderWidth: 2,
    padding: 5,
    width: "85%",
  },
  messageView: {},
  inputText: {
    fontSize: 18,
    color: "white",
  },
  sendButton: {
    width: "100%",
    height: "100%",
    paddingLeft: 10,
  },
})

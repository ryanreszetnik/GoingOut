import React, { useRef, useState } from "react"
import { View, Text, StyleSheet, TextInput } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"

import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { useSelector } from "react-redux"
import ChatMessage from "../Components/ChatMessage"

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
            color="tomato"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  page: {
    height: "100%",
  },
  inputContainer: {
    height: 45,
    backgroundColor: "#FFF",
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#e9e9e9",
    borderRadius: 10,
    padding: 5,
    width: "85%",
  },
  messageView: {},
  inputText: {
    fontSize: 18,
    color: "#101010",
  },
  sendButton: {
    width: "100%",
    height: "100%",
    paddingLeft: 10,
  },
})

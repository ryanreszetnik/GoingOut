import React from 'react'
import { View, Text, StyleSheet } from "react-native";

export default function Notification({notification}) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{notification.message}</Text>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    paddingTop:5,
    paddingLeft:5,
    borderBottomColor: "black",
    borderTopWidth: 0.5,
    height:50
  },
  message:{
      fontSize:16
  }
});
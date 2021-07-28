import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import AppButton from "../../../Components/AppButton"
import TempGroupPreview from "../../../Components/TempGroupPreview"
import UserList from "../../../Components/UserList"
import { SET_CUR_PROFILE } from "../../Actions/friendActions"
import { REQUEST } from "../../Constants/friendConstants"
import { NOTIFICATIONS_PAGE } from "../../Constants/pageConstants"
import { appLoad, loadUsers } from "../../Endpoints/generalEndpoints"
import Notification from "./Notification"

export default function Notifications({ navigation }) {
  const friends = useSelector((state) => state.friends)
  const notifications = useSelector((state) => state.notifications)
  const requests = friends
    .filter((friend) => friend.status === REQUEST)
    .map((f) => f.sub)
  const dispatch = useDispatch()
  const tempGroups = useSelector((state) => state.tempGroups)
  const nextEvent = tempGroups.sort(function (a, b) {
    return `${a.date}T${a.time}` > `${b.date}T${b.time}`
  })[0]
  const selectUser = (profile) => {
    dispatch({
      type: SET_CUR_PROFILE,
      payload: profile,
      page: NOTIFICATIONS_PAGE,
    })
    navigation.navigate("User Profile")
  }
  const moveToView = (id) => {}

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.header}>Requests From:</Text>
        {requests.length > 0 ? (
          <UserList onPress={selectUser} subs={requests} />
        ) : (
          <Text>No Requests</Text>
        )}
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Next Event</Text>
        {nextEvent ? (
          <TempGroupPreview
            group={nextEvent}
            key={nextEvent.groupId}
            onPress={() => moveToView(nextEvent.groupId)}
            id={nextEvent.groupId}
          />
        ) : (
          <Text>No events</Text>
        )}
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Notifications</Text>
        {notifications.map((not) => {
          return <Notification key={JSON.stringify(not)} notification={not} />
        })}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
  },
})

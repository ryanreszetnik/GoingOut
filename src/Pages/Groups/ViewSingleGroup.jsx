import React, { Fragment } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AppButton from "../../Components/AppButton"
import { ScrollView } from "react-native-gesture-handler"
import EventPreview from "../../Components/EventPreview"
import { leaveGroup } from "../../Socket/socketMethods"
import { navigate } from "../../Navigation/RootNavigation"
import {
  EVENTS_SINGLE_EVENT,
  GROUPS_CREATE_EVENT,
  GROUPS_EDIT_GROUP,
  GROUPS_VIEW,
} from "../../Constants/screens"
import DisplayTextField from "../../Components/DisplayTextField"
import { PAGE_BACKGROUND_COLOR } from "../../Theme/theme.style"

export default function ViewSingleGroup({ navigation, route }) {
  const { groupId } = route.params
  const group = useSelector((state) =>
    state.groups.find((group) => group.groupId === groupId)
  )
  const events = useSelector((state) => state.events)

  const editGroup = () => {
    navigation.navigate(GROUPS_EDIT_GROUP, { groupId: groupId })
  }
  const createEvent = () => {
    navigation.navigate(GROUPS_CREATE_EVENT, { groupId: groupId })
  }
  const goToEvent = (gr) => {
    navigate(EVENTS_SINGLE_EVENT, { eventId: gr.eventId })
  }

  const leaveGroupHere = async () => {
    const leave = group.members.length !== 1 ? true : false
    leaveGroup(groupId, leave)
    navigation.navigate(GROUPS_VIEW)
  }

  return (
    <ScrollView style={styles.page}>
      {group && (
        <View style={styles.container}>
          <View style={styles.attributeContainer}>
            <DisplayTextField
              icon="form-textbox"
              value={group.name}
              label="Group Name"
            />
            <DisplayTextField icon="card-text" value={group.bio} label="Bio" />

            {group.events && group.events.length > 0 && (
              <View style={styles.txtField}>
                <Text>{`Events`}</Text>
                {group.events.map((gr) => {
                  const grData = events.find((gro) => gro.eventId === gr)
                  if (!grData) {
                    return <Fragment key={Math.random()} />
                  }

                  return (
                    <EventPreview
                      event={grData}
                      onPress={goToEvent}
                      key={grData.eventId}
                    />
                  )
                })}
              </View>
            )}
          </View>

          <View style={{ alignItems: "center" }}>
            <AppButton title="Edit Group" onPress={editGroup} />
            <AppButton title="Create Event" onPress={createEvent} />
            <AppButton title="Leave Group" onPress={leaveGroupHere} />
          </View>
        </View>
      )}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  page: { height: "100%", backgroundColor: PAGE_BACKGROUND_COLOR },
  container: {
    width: "95%",
    alignSelf: "center",
  },
  img: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    marginLeft: "10%",
  },
  imageFriends: {
    flexDirection: "row",
  },
  imgTitle: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 15,
  },
  attributeContainer: {
    marginVertical: 10,
  },
  txtField: {
    borderTopWidth: 0.5,
    marginVertical: 5,
    paddingVertical: 5,
  },

  attributeTxt: {
    fontSize: 20,
    paddingVertical: 2,
    marginVertical: 2,
  },
})

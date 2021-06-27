import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useDispatch, useSelector, batch } from "react-redux"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AppButton from "../../../Components/AppButton"
import { SET_USER_GROUPS } from "../../Actions/authActions"
import {
  REMOVE_MEMBERS,
  REMOVE_PERM_GROUP,
  SET_CUR_GROUP,
} from "../../Actions/groupActions"
import {
  removeMembers,
  removePermGroup,
} from "../../Endpoints/permGroupsEndpoints"
import DatesList from "../../../Components/DatesList"
import { ScrollView } from "react-native-gesture-handler"

export default function ViewSingleGroup({ navigation }) {
  const dispatch = useDispatch()
  const curID = useSelector((state) => state.groups.curGroup)
  const group = useSelector((state) =>
    state.groups.permGroups.find((group) => group.groupId === curID)
  )
  const groups = useSelector((state) => state.groups.permGroups)
  const sub = useSelector((state) => state.userSession.userData.attributes.sub)

  const editGroup = () => {
    navigation.navigate("Edit Group")
  }

  const leaveGroup = async () => {
    batch(() => {
      dispatch({ type: REMOVE_PERM_GROUP, payload: curID })
      dispatch({
        type: REMOVE_MEMBERS,
        payload: group.members.filter((member) => member.sub !== sub),
      })
      dispatch({
        type: SET_USER_GROUPS,
        payload: groups.map((group) => group.groupId),
      })
      dispatch({ type: SET_CUR_GROUP, payload: null })
    })
    group.members.length === 1
      ? await removePermGroup(curID, sub)
      : await removeMembers(
          group.members.filter((member) => member.sub !== sub, sub),
          curID,
          [sub]
        )
    navigation.navigate("View Perm Groups")
  }

  return (
    <ScrollView>
      {group && (
        <View style={styles.container}>
          <View style={styles.attributeContainer}>
            <View style={styles.txtField}>
              <Text>
                <MaterialCommunityIcons
                  name='form-textbox'
                  size={20}
                  color='#6e6869'
                  style={styles.icon}
                />
                {`  Group Name`}
              </Text>
              <Text style={styles.attributeTxt}>{group.name}</Text>
            </View>
            <View style={styles.txtField}>
              <Text>
                <MaterialCommunityIcons
                  name='card-text'
                  size={20}
                  color='#6e6869'
                  style={styles.icon}
                />
                {`  Bio`}
              </Text>
              <Text style={styles.attributeTxt}>{group.bio}</Text>
            </View>
            <View style={styles.txtField}>
              <Text>
                <MaterialCommunityIcons
                  name='google-maps'
                  size={20}
                  color='#6e6869'
                  style={styles.icon}
                />
                {`  Location`}
              </Text>
              <Text style={styles.attributeTxt}>
                {/*group.location*/ "placeholder"}
              </Text>
            </View>
            <Text>Current Dates</Text>
            <DatesList
              dates={group.dates}
              curDates={group.dates}
              onDelete={() => {}}
              onPress={() => {}}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <AppButton title='Edit Group' onPress={editGroup} />
            <AppButton title='Leave Group' onPress={leaveGroup} />
          </View>
        </View>
      )}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
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
  imgText: {
    backgroundColor: "#c0c0c0",
    padding: 5,
    marginLeft: "30%",
    borderRadius: 5,
    alignSelf: "center",
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

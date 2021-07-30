import React, { Fragment } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useDispatch, useSelector, batch } from "react-redux"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AppButton from "../../../Components/AppButton"
import { SET_USER_GROUPS } from "../../Actions/authActions"
import {
  REMOVE_MEMBERS,
  REMOVE_PERM_GROUP,
  SET_CUR_GROUP,
  SET_CUR_TEMP_GROUP,
} from "../../Actions/groupActions"
import { ScrollView } from "react-native-gesture-handler"
import TempGroupPreview from "../../../Components/TempGroupPreview"
import { leavePermGroup } from "../../Socket/SocketMethods"
import { navigate } from "../../Navigation/RootNavigation"

export default function ViewSingleGroup({ navigation, tabNavigator }) {
  const dispatch = useDispatch()
  const curID = useSelector((state) => state.current.permGroup)
  const group = useSelector((state) =>
    state.permGroups.find((group) => group.groupId === curID)
  )
  const groups = useSelector((state) => state.permGroups)
  const sub = useSelector((state) => state.userSession.userData.attributes.sub)
  const tempGroups = useSelector((state) => state.tempGroups)

  const editGroup = () => {
    navigation.navigate("Edit Group")
  }
  const createEvent = () => {
    navigation.navigate("Create Temp From Perm")
  }
  const goToEvent = (gr) => {
    dispatch({ type: SET_CUR_TEMP_GROUP, payload: gr.groupId })
    navigate("View Single Temp Group")
  }

  const leaveGroup = async () => {
    const leave = group.members.length !== 1 ? true : false
    leavePermGroup(curID, leave)
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
                  name="form-textbox"
                  size={20}
                  color="#6e6869"
                  style={styles.icon}
                />
                {`  Group Name`}
              </Text>
              <Text style={styles.attributeTxt}>{group.name}</Text>
            </View>
            <View style={styles.txtField}>
              <Text>
                <MaterialCommunityIcons
                  name="card-text"
                  size={20}
                  color="#6e6869"
                  style={styles.icon}
                />
                {`  Bio`}
              </Text>
              <Text style={styles.attributeTxt}>{group.bio}</Text>
            </View>
            <View style={styles.txtField}>
              <Text>
                <MaterialCommunityIcons
                  name="google-maps"
                  size={20}
                  color="#6e6869"
                  style={styles.icon}
                />
                {`  Location`}
              </Text>
              <Text style={styles.attributeTxt}>
                {/*group.location*/ "placeholder"}
              </Text>
            </View>
            {group.tempGroups && group.tempGroups.length > 0 && (
              <View style={styles.txtField}>
                <Text>{`Events`}</Text>
                {group.tempGroups.map((gr) => {
                  const grData = tempGroups.find((gro) => gro.groupId === gr)
                  if (!grData) {
                    return <Fragment key={Math.random()} />
                  }

                  return (
                    <TempGroupPreview
                      group={grData}
                      onPress={goToEvent}
                      key={grData.groupId}
                    />
                  )
                })}
              </View>
            )}
          </View>

          <View style={{ alignItems: "center" }}>
            <AppButton title="Edit Group" onPress={editGroup} />
            <AppButton title="Create Event" onPress={createEvent} />
            <AppButton title="Leave Group" onPress={leaveGroup} />
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

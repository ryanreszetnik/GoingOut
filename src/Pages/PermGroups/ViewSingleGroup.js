import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AppButton from "../../../Components/AppButton"
export default function ViewSingleGroup({ navigation }) {
  const curID = useSelector((state) => state.groups.curGroup)
  const group = useSelector((state) =>
    state.groups.permGroups.find((group) => group.groupId === curID)
  )

  const editGroup = () => {
    navigation.navigate("Edit Group")
  }

  return (
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
        <View style={styles.txtField}>
          <Text>
            <MaterialCommunityIcons
              name='numeric'
              size={20}
              color='#6e6869'
              style={styles.icon}
            />
            {`  Average Age`}
          </Text>
          <Text style={styles.attributeTxt}>{group.averageAge}</Text>
        </View>
        <View style={styles.txtField}>
          <Text>
            <MaterialCommunityIcons
              name='gender-male-female'
              size={20}
              color='#6e6869'
              style={styles.icon}
            />
            {`  Average Gender`}
          </Text>
          <Text style={styles.attributeTxt}>{group.averageGender}</Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <AppButton title='Edit Group' onPress={editGroup} />
      </View>
    </View>
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

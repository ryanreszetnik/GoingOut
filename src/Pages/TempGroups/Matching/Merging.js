import React, { useRef, useState } from "react"
import { View, Text, ScrollView } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import AppButton from "../../../../Components/AppButton"
import MonthPicker from "../../../../Components/MonthPicker"
import { ADD_TEMP_GROUP } from "../../../Actions/groupActions"
import GroupPreview from "../../../../Components/GroupPreview"
//import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"
import { showMessage, hideMessage } from "react-native-flash-message"
import FlashMessage from "react-native-flash-message"
import { addTempGroup } from "../../../Endpoints/tempGroupsEndpoints"
import uuid from "react-native-uuid"
import AppTextInput from "../../../../Components/AppTextInput"

export default function Merging({ navigation }) {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import UserFriendList from "../../../Components/UserFriendList"
import { Friend } from "../../Types/common.types"
import { useSelector, useDispatch } from "react-redux"
import { ScrollView } from "react-native-gesture-handler"

export default function Friends({ navigation }) {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.friends.curProfile)

  return (
    <ScrollView>
      <UserList users={users} onPress={selectUser} />
    </ScrollView>
  )
}

import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { SET_OTHER_FRIENDS } from "../src/Actions/friendActions"
import { getFriends } from "../src/Endpoints/friendsEndpoints"

export default function UserFriendList({ sub }) {
  const [friendList, setList] = useState([])

  useEffect(() => {
    updateList()
  }, [])

  const updateList = async () => {
    setList(await getFriends(sub))
  }
  return (
    <View>
      {friendList.length > 0 &&
        friendList.map((friend) => (
          <Text key={friend.sub}>{`Username: ${friend.username}
  Status: ${friend.status}`}</Text>
        ))}
    </View>
  )
}

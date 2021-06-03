import React, { useEffect } from "react"
import { View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { SET_FRIENDS } from "../src/Actions/friendActions"
import { getFriends } from "../src/Endpoints/friendsEndpoints"

export default function FriendList() {
  const dispatch = new useDispatch()
  const sub = useSelector((state) => state.userSession.userData.attributes.sub)
  const friendObj = useSelector((state) => state.friends)
  useEffect(() => {
    updateList()
  }, [])

  const updateList = async () => {
    dispatch({ type: SET_FRIENDS, payload: await getFriends(sub) })
  }
  return (
    <View>
      {friendObj.friends.length > 0 &&
        friendObj.friends.map((friend) => (
          <Text key={friend.sub}>{`Username: ${friend.username}
  Status: ${friend.status}`}</Text>
        ))}
    </View>
  )
}

import React, { useEffect } from "react"
import { useState } from "react"
import { View, Text } from "react-native"
import SelectMembers from "../../CommonPages/SelectMembers"

export default function EditMembers({ route, navigation }) {
  const { initialMembers, setMembers } = route.params
  const [members, setLocalMembers] = useState(initialMembers)
  const addMember = (sub) => {
    const newMemList = [...members, sub]
    setLocalMembers(newMemList)
    setMembers(newMemList)
  }
  const removeMember = (sub) => {
    const newMemList = members.filter((m) => m !== sub)
    setLocalMembers(newMemList)
    setMembers(newMemList)
  }
  return (
    <SelectMembers
      members={members}
      addMember={addMember}
      removeMember={removeMember}
    />
  )
}

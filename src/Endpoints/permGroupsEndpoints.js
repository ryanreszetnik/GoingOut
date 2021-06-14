import API from "@aws-amplify/api"
import { Auth } from "aws-amplify"

export const getPermGroups = async (sub) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: { sub },
    headers: {
      Authorization,
      "Content-Type": "application/json",
      sub,
    },
  }
  const data = await API.get("GeneralEndpoint", `/groups/groupdata`, apiRequest)

  return data
}

export const addPermGroup = async (group) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: group,
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }

  const data = await API.post(
    "GeneralEndpoint",
    `/groups/groupdata`,
    apiRequest
  )

  return data
}

export const removePermGroup = async (id, sub) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: { groupId: id, sub },
    headers: {
      Authorization,
      "Content-Type": "application/json",
      member: false,
    },
  }
  const data = await API.del("GeneralEndpoint", `/groups/groupdata`, apiRequest)

  return data
}

export const addMembers = async (members, id) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: { members, groupId: id },
    headers: {
      Authorization,
      "Content-Type": "application/json",
      member: true,
    },
  }
  const data = await API.put("GeneralEndpoint", `/groups/groupdata`, apiRequest)

  return data
}

export const removeMembers = async (members, id, sub) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken
  const apiRequest = {
    body: { members, groupId: id, sub },
    headers: {
      Authorization,
      "Content-Type": "application/json",
      member: true,
    },
  }
  const data = await API.del("GeneralEndpoint", `/groups/groupdata`, apiRequest)

  return data
}

export const updateGroup = async (group) => {
  const signInUserSession = (await Auth.currentAuthenticatedUser())
    .signInUserSession
  const apiRequest = {
    body: group,
    headers: {
      Authorization: signInUserSession.idToken.jwtToken,
      "Content-Type": "application/json",
      member: false,
    },
  }
  const data = await API.put("GeneralEndpoint", "/groups/groupdata", apiRequest)
  return data
}

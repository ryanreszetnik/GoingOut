import API from "@aws-amplify/api"
import { Auth } from "aws-amplify"

export const searchUser = async (search) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: {},
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  const data = await API.get(
    "GeneralEndpoint",
    `/searchusers?search=${search}`,
    apiRequest
  )
  console.log(data)
  return data
}

export const requestFriend = async (sub) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: { user: sub },
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  const data = await API.post("GeneralEndpoint", `/friends`, apiRequest)
  console.log(data)

  return data
}

export const getFriends = async (sub) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: {},
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  const data = await API.get(
    "GeneralEndpoint",
    `/friends?user=${sub}`,
    apiRequest
  )

  return data
}

export const acceptRequest = async (sub) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: { user: sub },
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  const data = await API.put("GeneralEndpoint", `/friends`, apiRequest)

  return data
}
export const deleteFriend = async (sub) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: { user: sub },
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  const data = await API.del("GeneralEndpoint", `/friends`, apiRequest)

  return data
}

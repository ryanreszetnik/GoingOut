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

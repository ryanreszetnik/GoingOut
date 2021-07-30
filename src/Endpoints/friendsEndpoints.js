import API from "@aws-amplify/api"
import { Auth } from "aws-amplify"

export const searchUser = async (search) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
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

  return data
}

export const getFriends = async (sub) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  console.log("Searching for friend", sub)
  const data = await API.get(
    "GeneralEndpoint",
    `/friends?user=${sub}`,
    apiRequest
  )
  console.log("Got friends", data)

  return data
}

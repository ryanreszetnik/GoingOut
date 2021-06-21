import API from "@aws-amplify/api"
import { Auth } from "aws-amplify"

export const getPotentialMatches = async (date, groupId) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: {
      date: date,
      groupId: groupId,
    },
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  console.log(JSON.stringify(apiRequest))
  const data = await API.get(
    "GeneralEndpoint",
    "/groups/potentialmatches",
    apiRequest
  )
  return data
}

export const addPotentialMatch = async (match) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: {
      match,
    },
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  const data = await API.post(
    "GeneralEndpoint",
    "/groups/potentialmatches",
    apiRequest
  )
  return data
}

export const removePotentialMatch = async (match) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: {
      match,
    },
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  const data = await API.del(
    "GeneralEndpoint",
    "/groups/potentialmatches",
    apiRequest
  )
  return data
}

export const createMatch = async (match) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken
  console.log("SENDING MATCH", match)
  const apiRequest = {
    body: match,
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  console.log(JSON.stringify(apiRequest))
  const data = await API.post("GeneralEndpoint", "/groups/matches", apiRequest)
  return data
}

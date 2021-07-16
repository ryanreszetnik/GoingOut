import API from "@aws-amplify/api"
import { Auth, JS } from "aws-amplify"

export const appLoad = async () => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken
  console.log(
    (await Auth.currentAuthenticatedUser()).signInUserSession.accessToken
      .jwtToken
  )
  const apiRequest = {
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  console.log(apiRequest)
  let data
  try {
    data = await API.get("GeneralEndpoint", "/", apiRequest)
  } catch (error) {
    console.log("ERROR:")
    console.log(JSON.stringify(error))
  }

  return data
}

export const loadUsers = async (subs) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    headers: {
      Authorization,
      subs: JSON.stringify(subs),
      "Content-Type": "application/json",
    },
  }

  let data
  try {
    data = await API.get("GeneralEndpoint", "/loadprofiles", apiRequest)
  } catch (error) {
    console.log("ERROR:")
    console.log(JSON.stringify(error))
  }
  return data
}

import API from "@aws-amplify/api"
import { Auth } from "aws-amplify"

export const getUser = async (sub) => {
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
    `/profile?user=${sub}`,
    apiRequest
  )
  //.then((data) => console.log(data))
  //.catch((err) => console.log(err))
  return data
}

export const updateUser = async (newUser) => {
  const signInUserSession = (await Auth.currentAuthenticatedUser())
    .signInUserSession
  const apiRequest = {
    body: {
      AccessToken: signInUserSession.accessToken.jwtToken,
      user: newUser,
    },
    headers: {
      Authorization: signInUserSession.idToken.jwtToken,
      "Content-Type": "application/json",
    },
  }

  const data = await API.put("GeneralEndpoint", "/profile", apiRequest)

  return data
}

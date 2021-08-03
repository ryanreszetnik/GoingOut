import API from "@aws-amplify/api"
import { Auth } from "aws-amplify"

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

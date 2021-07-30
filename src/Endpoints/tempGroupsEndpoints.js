import API from "@aws-amplify/api"
import { Auth } from "aws-amplify"

export const searchMatches = async (id) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken
  const apiRequest = {
    headers: {
      id,
      Authorization,
      "Content-Type": "application/json",
    },
  }
  const data = await API.get(
    "GeneralEndpoint",
    `/groups/tempgroups`,
    apiRequest
  )

  return data
}

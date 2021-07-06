import API from "@aws-amplify/api"
import { Auth } from "aws-amplify"

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

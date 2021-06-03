import API from "@aws-amplify/api"
import {Auth} from "aws-amplify"
export const searchUser = async (search) => {
  const Authorization = (await Auth.currentAuthenticatedUser()).signInUserSession.idToken.jwtToken;

  const apiRequest = {
    body: {},
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  const data = await API.get(
    "ProfileEndpoint",
    `/searchusers?search=${search}`,
    apiRequest
  )
  return data
}
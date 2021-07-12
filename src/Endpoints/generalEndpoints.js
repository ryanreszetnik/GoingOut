import API from "@aws-amplify/api"
import { Auth } from "aws-amplify"

export const appLoad = async () => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: {},
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  let data
  try {
    data = await API.get("GeneralEndpoint", "/", apiRequest)
  } finally {
    // }catch(e){
    //   return false;
    // }
  }
  return data
}

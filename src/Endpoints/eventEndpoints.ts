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
    `/searchevents`,
    apiRequest
  )
  console.log(data)

  return data
}
export const getNearbyLocations=async(loc,locRange,category)=>{
  return [
    { name: "Dirty Dogs", latitude: 43.654, longitude: -79.4 ,locationId:"2311tgqwifak",address:"347 St. Laurent" },
    { name: "Warehouse", latitude: 0, longitude: 0,address:"842 Avenue Road" ,locationId:"bakjflajsdfj", },
  ]
}
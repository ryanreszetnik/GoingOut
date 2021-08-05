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
    { name: "Dirty Dogs", loc: { lat: 43.654, lon: -79.4 },locationId:"2311tgqwifak",address:"Somewhere Over the Rainbow" },
    { name: "Warehouse", loc: { lat: 0, lon: 0 },locationId:"bakjflajsdfj",address:"Way Up High"  },
  ]
}
import API from "@aws-amplify/api"
import { Auth } from "aws-amplify"
const testGroup = {
  name: "Some Name",
  members: [
    {
      sub: "12478981728719",
      username: "jdkfs",
      name: "skajf",
      gender: "Male",
      birthdate: "2002-08-28",
    },
    {
      sub: "2uoi25yu2uu4",
      username: "jdkfs",
      name: "skajf",
      gender: "Male",
      birthdate: "2003-03-21",
    },
    {
      sub: "2uioqwiehfsdf",
      username: "jdkfs",
      name: "skajf",
      gender: "Female",
      birthdate: "2001-01-19",
    },
  ],
  bio: "Going out",
  loc: "Somewhere",
  locRange: 25,
  minAge: 16,
  maxAge: 23,
  genderPref: "Female",
  permanent: true,
}
export const createGroup = async (newGroup) => {
  const signInUserSession = (await Auth.currentAuthenticatedUser())
    .signInUserSession
  const apiRequest = {
    body: testGroup,
    headers: {
      Authorization: signInUserSession.idToken.jwtToken,
      "Content-Type": "application/json",
    },
  }
  const data = await API.post(
    "GeneralEndpoint",
    "/groups/groupdata",
    apiRequest
  )
  return data
}

export const deleteGroup = async (id) => {
  const signInUserSession = (await Auth.currentAuthenticatedUser())
    .signInUserSession
  const apiRequest = {
    body: { groupId: id },
    headers: {
      Authorization: signInUserSession.idToken.jwtToken,
      "Content-Type": "application/json",
    },
  }
  const data = await API.del("GeneralEndpoint", "/groups/groupdata", apiRequest)
  return data
}

export const updateGroup = async (group) => {
  const signInUserSession = (await Auth.currentAuthenticatedUser())
    .signInUserSession
  const apiRequest = {
    body: group,
    headers: {
      Authorization: signInUserSession.idToken.jwtToken,
      "Content-Type": "application/json",
    },
  }
  const data = await API.put("GeneralEndpoint", "/groups/groupdata", apiRequest)
  return data
}

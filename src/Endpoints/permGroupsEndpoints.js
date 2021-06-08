export const getPermGroups = async () => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: {},
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  const data = await API.get("GeneralEndpoint", `/groups`, apiRequest)

  return data
}

export const addPermGroup = async (group) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: { ...group },
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  const data = await API.post("GeneralEndpoint", `/groups`, apiRequest)

  return data
}

export const removePermGroup = async (id) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: { groupID: id },
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  const data = await API.del("GeneralEndpoint", `/groups`, apiRequest)

  return data
}

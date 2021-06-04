export const getPermGroups = async (sub) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken

  const apiRequest = {
    body: {},
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  }
  const data = await API.get("GeneralEndpoint", `/friends`, apiRequest)

  return data
}

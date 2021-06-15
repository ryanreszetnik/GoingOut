import API from "@aws-amplify/api";
import { Auth } from "aws-amplify";

export const appLoad = async () => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken;

  const apiRequest = {
    body: {},
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  };
  const data = await API.get(
    "GeneralEndpoint",
    "/",
    apiRequest
  );
  return data;
};

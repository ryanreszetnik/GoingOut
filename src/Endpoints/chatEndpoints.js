import API from "@aws-amplify/api";
import { Auth } from "aws-amplify";

export const sendMessage = async (message) => {
  const Authorization = (await Auth.currentAuthenticatedUser())
    .signInUserSession.idToken.jwtToken;

  const apiRequest = {
    body: message,
    headers: {
      Authorization,
      "Content-Type": "application/json",
    },
  };
  const data = await API.post(
    "GeneralEndpoint",
    "/messages",
    apiRequest
  );
  return data;
};

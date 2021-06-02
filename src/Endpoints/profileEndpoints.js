import { useDispatch, useSelector } from "react-redux"
import API from "@aws-amplify/api"

export const getUser=async(sub, user)=>{
    const apiRequest = {
      body: {}
      ,
      headers: {
        Authorization: user.signInUserSession.idToken.jwtToken,
        "Content-Type": "application/json",
      },
    }
    const data = await API.get("ProfileEndpoint", `/profile?user=${sub}`, apiRequest)
    // .then((data) => console.log(data))
    //   .catch((err) => console.log(err))
    return data;
}
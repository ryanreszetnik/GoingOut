import API from "@aws-amplify/api"
import Amplify, {Auth} from 'aws-amplify';
import React from "react"
import { View, Text, Button } from "react-native"
import {SET_PROFILE} from '../../Actions/profileActions'
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import {getUser} from '../../Endpoints/profileEndpoints'

export default function ViewProfile({ navigation }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userSession.user)
  const profile = useSelector((state) => state.profile)
  const userData = useSelector((state) => state.userSession.userData)



  async function getProfile() {
    dispatch({type:SET_PROFILE, payload:await getUser(userData.attributes.sub,user)});
  }
  

    
   if(!profile){
     getProfile()
   }
  
   
  return (
    <SafeAreaView>
      {profile?<View>
      <Text>Profile Photo</Text>
      <Text>Name</Text>
      <Text>{profile.username}</Text>
      <Text>{profile.email}</Text>
      <Text>{profile.phone_number}</Text>
      <Text>{profile.birthdate}</Text>
      <Text>{profile.gender}</Text>
      <Button title='req' onPress={getProfile} />
       <Button title='req2' onPress={()=>getUser('00ad23dc-eb91-4cb4-9f53-b0fcc20c51ea',user)} />
       <Button title='req3' onPress={()=>console.log(JSON.stringify(profile))} />
       </View>:<View/>}
       
    </SafeAreaView>
  )
}
//await Auth.currentAuthenticatedUser()
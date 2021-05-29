import React from 'react'
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';
import {useSelector} from 'react-redux';
import { SET_AUTH_STATUS } from '../../Actions/authActions';
import { LOGGED_OUT } from '../../Constants/authConstants';
export default function Profile() {
  const user = useSelector(state=>state.userSession.user);
    async function signOut() {
    try {
      await Auth.signOut();
      dispatch({type:SET_AUTH_STATUS, payload:LOGGED_OUT});
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }
    return (
        <SafeAreaView>
            <Text>Profile Photo</Text>
            <Text>Name</Text>
            <Text>{user.username}</Text>
            <Text>{user.attributes.email}</Text>
            <Text>Phone</Text>
            <Text>Birthday</Text>
            <Text>Gender</Text>
            <Button title="Sign Out" color="tomato" onPress={signOut} />
        </SafeAreaView>
    )
}

import React from 'react'
import { View, Text,Button } from 'react-native'
import { Auth } from 'aws-amplify';
import { SET_AUTH_STATUS } from '../../Actions/authActions';
import { LOGGED_OUT } from '../../Constants/authConstants';

export default function EditProfile({navigation}) {
    async function signOut() {
    try {
      await Auth.signOut();
      dispatch({type:SET_AUTH_STATUS, payload:LOGGED_OUT});
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }
    return (
        <View>
            <Text>Edit Profile</Text>
            <Button title="Back To Profile" color="tomato" onPress={()=>navigation.navigate('ViewProfile')} />
             <Button title="Sign Out" color="tomato" onPress={signOut} />
        </View>
    )
}

import React from 'react'
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';
export default function Profile({ updateAuthState, user }) {
    async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }
//   console.log(`user--> ${JSON.stringify(user)}`);
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

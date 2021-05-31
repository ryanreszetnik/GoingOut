import React from 'react'
import { View, Text,Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';
const ProfileStack = createStackNavigator();
import { useSelector } from 'react-redux';
import API from '@aws-amplify/api';

export default function Profile({navigation}) {
  
    
    const user = useSelector(state=>state.userSession.user);


    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen 
          name="ViewProfile" 
          component={ViewProfile} 
          options={{
            headerTitle:user.username, 
            headerRight:()=>(<Button title="edit" onPress={()=>navigation.navigate('EditProfile')}/>)
          }}/>
        <ProfileStack.Screen name="EditProfile" component={EditProfile}/>
        </ProfileStack.Navigator>
    )
}

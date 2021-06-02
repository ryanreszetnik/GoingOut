import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import Amplify, {Auth} from 'aws-amplify';
import {awsConfig,endpoints} from './src/aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SignIn from './src/Pages/Authentication/SignIn';
import SignUp from './src/Pages/Authentication/SignUp';
import ConfirmSignUp from './src/Pages/Authentication/ConfirmSignUp';
import Profile from './src/Pages/Profile/Profile';
import ForgotPassword from './src/Pages/Authentication/ForgotPassword';
import { useDispatch ,useSelector,batch} from 'react-redux';
import { SET_AUTH_STATUS, SET_AUTH_USER, SET_CURR_USER_DATA } from './src/Actions/authActions';
import {LOGGED_IN, LOGGED_OUT, INITIALIZING} from './src/Constants/authConstants';
import TempGroups from './src/Pages/TempGroups/TempGroups';
import Upcoming from './src/Pages/Upcoming/Upcoming';
import PermGroups from './src/Pages/PermGroups/PermGroups';


Amplify.configure({Auth:awsConfig,endpoints:endpoints});


const AuthenticationStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="SignIn" component={SignIn}/>
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
      />
      <AuthenticationStack.Screen name="ResetPassword" component={ForgotPassword}/>
    </AuthenticationStack.Navigator>
  );
};

const TabNavigator = () =>{
  console.log(useSelector(state=>state.userSession.user))
return (
    <Tab.Navigator>
      <Tab.Screen name="Upcoming" component={Upcoming}/>
      <Tab.Screen name="Temp Groups" component={TempGroups}/>
      <Tab.Screen name="Perm Groups" component={PermGroups}/>
      <Tab.Screen name="Profile" component={Profile}/>
    </Tab.Navigator>
  );
}

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="tomato" />
      <Button title="Reload" color="tomato" onPress={()=>checkAuthState()} />
    </View>
  );
};

function App() {
  const authStatus = useSelector(state=>state.userSession.authStatus);
  const user = useSelector(state=>state.userSession.user);
  const dispatch = useDispatch();
  useEffect(() => {
    checkAuthState();
    
  }, []);
  async function checkAuthState() {
    try {
      dispatch({type:SET_AUTH_USER, payload:await Auth.currentAuthenticatedUser()});
      dispatch({type:SET_CURR_USER_DATA, payload:await Auth.currentUserInfo()});
      console.log(' User is signed in', user.signInUserSession.idToken.jwtToken);
      dispatch({type:SET_AUTH_STATUS, payload:LOGGED_IN});
    } catch (err) {
      console.log(' User is not signed in');
      batch(()=>{
        dispatch({type:SET_AUTH_STATUS, payload:LOGGED_OUT});
        dispatch({type:SET_AUTH_USER, payload:null});
      })
    }
  }
  return (
      
        <NavigationContainer>
          {authStatus === INITIALIZING && <Initializing />}
          {authStatus === LOGGED_IN &&(
              <TabNavigator/>
          )}
          {authStatus === LOGGED_OUT && (
            <AuthenticationNavigator/>
          )}
        </NavigationContainer>
    
    );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

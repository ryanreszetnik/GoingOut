import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Amplify, {Auth} from 'aws-amplify';
import awsConfig from './src/aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SignIn from './src/Authentication/SignIn';
import SignUp from './src/Authentication/SignUp';
import ConfirmSignUp from './src/Authentication/ConfirmSignUp';
import Home from './src/Authentication/Home';
import Profile from './src/Profile/Profile';
import ForgotPassword from './src/Authentication/ForgotPassword';
import CreateGroupSettings from './src/CreateGroup/CreateGroupSettings';
import CreateGroup from './src/CreateGroup/CreateGroup';

Amplify.configure(awsConfig);

const AuthenticationStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="SignIn">
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
      />
      <AuthenticationStack.Screen name="ResetPassword">
        {screenProps => (
          <ForgotPassword {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
    </AuthenticationStack.Navigator>
  );
};

const TabNavigator = props =>{
return (
    <Tab.Navigator>
      <Tab.Screen name="Create Group">
        {screenProps => (
          <CreateGroup {...screenProps} user={props.user}/>
        )}
      </Tab.Screen>
      <Tab.Screen name="Home">
        {screenProps => (
          <Home {...screenProps} updateAuthState={props.updateAuthState} user={props.user}/>
        )}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {screenProps => (
          <Profile {...screenProps} updateAuthState={props.updateAuthState} user={props.user}/>
        )}
      </Tab.Screen>

    </Tab.Navigator>
  );
}

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};

function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  const [user, setUser]= useState(null);
  useEffect(() => {
    checkAuthState();
  }, []);
  async function checkAuthState() {
    try {
      setUser(await Auth.currentAuthenticatedUser());
      console.log(' User is signed in');
      setUserLoggedIn('loggedIn');
    } catch (err) {
      console.log(' User is not signed in');
      setUserLoggedIn('loggedOut')
      setUser(null);
    }
  }
  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }
  return (
      <NavigationContainer>
        {isUserLoggedIn === 'initializing' && <Initializing />}
        {isUserLoggedIn === 'loggedIn' && user &&(
            <TabNavigator updateAuthState={updateAuthState} user={user}/>
        )}
        {isUserLoggedIn === 'loggedOut' && (
          <AuthenticationNavigator updateAuthState={updateAuthState} />
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

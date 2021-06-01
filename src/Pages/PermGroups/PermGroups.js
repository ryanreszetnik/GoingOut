import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react'
import {View,Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import MonthPicker from '../../../Components/MonthPicker';
import CreateGroup from './CreateGroup';
import CreateGroupSettings from './CreateGroupSettings';
import CreatePermGroup from './CreatePermGroup';
import ViewPermGroups from './ViewPermGroups';
const PermGroupNavigator = createStackNavigator();
const newGroupInitial = {
    name:"",
    members:[],
    datetime:"",
    bio:"",
    location:null,
    locationRange:50,
    ageRange:{
        minAge:0,
        maxAge:100
    },
    genderPreference:"Neutral"
};
export default function PermGroups() {
    const [newGroup, setNewGroup] = useState(newGroupInitial); 
    return (
        <PermGroupNavigator.Navigator>
            <PermGroupNavigator.Screen name ="View Perm Groups" component ={ViewPermGroups}/>
            <PermGroupNavigator.Screen name ="Create Perm Group">{screenProps => (
                <CreateGroupSettings {...screenProps} group={newGroup}/>
            )}</PermGroupNavigator.Screen>            
            <PermGroupNavigator.Screen name ="Choose Day" component={MonthPicker}/> 
        </PermGroupNavigator.Navigator>
    )
}

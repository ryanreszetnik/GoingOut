import React, {useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CreateGroupSettings from './CreateGroupSettings';
import MonthPicker from './MonthPicker';
import moment from 'moment';
import {useSelector} from 'react-redux';
const CreateGroupStack = createStackNavigator();

const initialGroup = {
    members:[],
    date:moment(),
    description:"",
    minAge:0,
    maxAge:200,
    location:"",
    locationRange:100
}

export default function CreateGroup() {
    const [group, setGroup] = useState(initialGroup)
    const user = useSelector(state=>state.userSession.user);
    const updateDate = (date)=>{
        setGroup(oldGroup=> {return {...oldGroup,date}});
    }
    return (
        <CreateGroupStack.Navigator screenOptions={group}>
            <CreateGroupStack.Screen name = "Settings">{screenProps => (
                <CreateGroupSettings {...screenProps} user={user} group={group}/>
            )}</CreateGroupStack.Screen>
            <CreateGroupStack.Screen name = "Choose Day">{screenProps => (
                <MonthPicker {...screenProps} updateDate={updateDate} initialDate={group.date}/>
            )}</CreateGroupStack.Screen>

            
        </CreateGroupStack.Navigator>
    )
}

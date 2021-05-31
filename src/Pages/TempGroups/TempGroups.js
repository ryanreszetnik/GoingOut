import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ViewTempGroups from './ViewTempGroups';



const TempGroupNavigator = createStackNavigator();

export default function TempGroups() {
    return (
        <TempGroupNavigator.Navigator>
            <TempGroupNavigator.Screen name="View Temp Groups" component={ViewTempGroups}/>
        </TempGroupNavigator.Navigator>
    )
}

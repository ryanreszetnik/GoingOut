import React from 'react';
import {View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import UserList from '../../../Components/UserList';
import { REQUEST } from '../../Constants/friendConstants';

export default function Notifications() {
    const friends = useSelector(state=>state.friends.friends)

    const selectUser = (user)=>{

    }

    return (
        <SafeAreaView>
            <Text>Requests From:</Text>
            <UserList onPress={selectUser} users={friends.filter(friend=>friend.status===REQUEST)}/>
            
        </SafeAreaView>
    )
}

import React from 'react';
import {View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '../../../Components/AppButton';
import UserList from '../../../Components/UserList';
import { SET_CUR_PROFILE } from '../../Actions/friendActions';
import { REQUEST } from '../../Constants/friendConstants';
import { createGroup } from '../../Endpoints/groupEndpoints';

export default function Notifications({navigation}) {
    const friends = useSelector(state=>state.friends.friends)
    const dispatch = useDispatch()

    const selectUser = (profile)=>{
        dispatch({ type: SET_CUR_PROFILE, payload: profile })
        navigation.navigate("User Profile")
    }
    const pressButton = async()=>{
        console.log(await createGroup());
    }

    return (
        <SafeAreaView>
            <Text>Requests From:</Text>
            <UserList onPress={selectUser} users={friends.filter(friend=>friend.status===REQUEST)}/>
            <AppButton title="send req" onPress={pressButton}/>
        </SafeAreaView>
    )
}

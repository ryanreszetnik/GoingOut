import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { searchUser } from '../src/Endpoints/friendsEndpoints';
import AppTextInput from './AppTextInput'

export default function FriendSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [friends, setFriends] = useState([{"usernmae":"tes","name":"ry"}]);
    useEffect(()=>{
        updateSearch("");
    },[])

    const updateSearch=async(term)=>{
        setSearchTerm(term);
        //if(term.length >0){
            const newFriends = (await searchUser(term));
            setFriends(friends=> newFriends?newFriends.Items:[]);
       // }
    }
    
    return (
        <View>
            <Text></Text>
            <AppTextInput
            value={searchTerm}
            onChangeText={(text) => updateSearch(text)}
            leftIcon='magnify'
            placeholder='Search For Users'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            />
            {
                friends.map(friend=>{
                    return <Text>{`Username: ${friend.username} Name: ${friend.name}`}</Text>
                })
            }
        </View>

    )
}

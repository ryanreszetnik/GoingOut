import React from 'react'
import { View, Text,Button } from 'react-native'
import { useSelector } from 'react-redux';
import GroupPreview from '../../../Components/GroupPreview';

export default function ViewPermGroups({navigation}) {
    const groups = useSelector(state=>state.groups);
    return (
        <View>
            <Text>View Perm Groups</Text>
            <Button title="Create New" color="tomato" onPress={()=>navigation.navigate('Create Perm Group')} />
            {groups.map(group=>{
                return <GroupPreview group ={group} key={group.id}/>
            })}
            
        </View>
    )
}

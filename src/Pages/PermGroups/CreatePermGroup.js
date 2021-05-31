import React from 'react'
import { View, Text,Button } from 'react-native'

export default function CreatePermGroup({navigation}) {
    return (
        <View>
            <Text>Create Perm Group</Text>
            <Button title="Back" color="tomato" onPress={()=>navigation.navigate('View Perm Groups')} />
        </View>
    )
}

import React, {useState} from 'react'
import { View, Text, Button, TextInput} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector} from 'react-redux';

import moment from 'moment';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default function CreateGroupSettings({navigation, group}) {
    const user = useSelector(state=>state.userSession.user);
    const [description,setDescription] = useState(group.description);
    const [ageRange,setAgeRange]= useState([group.minAge,group.maxAge]);
    const [maxDistance ,setMaxDistance] = useState(group.locationRange);
    return (
        <SafeAreaView>
            <Text>
            Members
            Date
            Description
            Categories
            AgeRange
            Location
            Location Range
            </Text>
            
            <Button title={`Date: ${moment(group.datetime).format("MMMM Do")}`} onPress={()=>navigation.navigate("Choose Day")}/>
            <Text>Description:</Text>
            <View style={{backgroundColor:"white"}}>
            <TextInput value={description} onChangeText={text=>setDescription(text)} multiline={true} numberOfLines={2} maxLength={100}/>
            </View>
            <Text>{`Maximum Distance: ${maxDistance}`}</Text>
            <MultiSlider min={1} max={100} onValuesChange={(values)=>setMaxDistance(values[0])}/>
            <Text>{`Age Range: ${ageRange[0]}-${ageRange[1]}`}</Text>
            <MultiSlider min={1} max={100} 
                isMarkersSeparated = {true} 
                allowOverlap={false} 
                values={ageRange}
                min={1}
                max={100}
                minMarkerOverlapStepDistance={5}
                onValuesChange={setAgeRange}
                />
            
            
        </SafeAreaView>
    )
}

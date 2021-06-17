import moment from 'moment';
import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DATE, SET_FOUND_MATCHES } from '../../../Actions/groupActions';
import { getPotentialMatches } from '../../../Endpoints/matchingEndpoints';

const dates = ["2021-06-20", "2021-06-21", "2021-06-23", "2021-06-22"];
//Search For Matches

export default function SelectDate({navigation}) {
    const dispatch =useDispatch();
    const curGroupId = useSelector(state=>state.groups.curGroup)

    const selectDate=async(date)=>{
        dispatch({type:SET_DATE,payload:date})
        const matches = await getPotentialMatches(date, curGroupId);
        dispatch({
          type: SET_FOUND_MATCHES,
          payload: matches,
        });
        navigation.navigate("Search For Matches");
    }

    const datePreview = (date)=>{
        return <TouchableOpacity style={styles.dateButton} onPress={()=>selectDate(date)}>
            <Text>{moment(date).format("dddd MMM Do")}</Text>
        </TouchableOpacity>
    }
    return (
        <View>
            <Text>Select Date</Text>
            {dates.map(date=>datePreview(date))}
        </View>
    )
}
const styles = StyleSheet.create({
  dateButton: {
    height: 40,
    backgroundColor: "#DDD",
    borderStyle: "solid",
    borderWidth: 1
  },
});

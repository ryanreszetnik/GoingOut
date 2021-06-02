import {SET_PROFILE} from '../Actions/profileActions'
const INITIAL_STATE = null;
export default function profileReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case SET_PROFILE:
            return{
                ...action.payload
            }
        default:
            return state;
    }
}
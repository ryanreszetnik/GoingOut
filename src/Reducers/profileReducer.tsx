import {SET_PROFILE, UPLOAD_IMAGE} from '../Actions/profileActions'
const INITIAL_STATE = null;
export default function profileReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case SET_PROFILE:
            return{...action.payload}
        default:
            return state;
        
        
    }
}
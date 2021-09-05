import {EVENTS_POTENTIAL_LOCATION,EVENTS_LOCATION_SELECT, GROUPS_LOCATION_SELECT, GROUPS_POTENTIAL_LOCATION} from "../Constants/screens"
export const getLocationAd=(page)=>{
    switch(page){
        case EVENTS_LOCATION_SELECT:
            return EVENTS_POTENTIAL_LOCATION
        case GROUPS_LOCATION_SELECT:
            return GROUPS_POTENTIAL_LOCATION
        default:
            return null
    }
}
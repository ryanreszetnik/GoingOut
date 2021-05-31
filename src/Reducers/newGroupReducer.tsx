import { CreateGroup } from "../Types/common.types";

const INITIAL_STATE = {
    name:"",
    members:[],
    datetime:"",
    bio:"",
    location:null,
    locationRange:50,
    ageRange:{
        minAge:0,
        maxAge:100
    },
    genderPreference:"Female"
};
export default function newGroupReducer(state:CreateGroup=INITIAL_STATE, action){
    switch(action.type){
        default:
            return state;
    }
}
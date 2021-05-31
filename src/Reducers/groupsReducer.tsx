import { Group } from "../Types/common.types";

const INITIAL_STATE = [{
    id:"1",
    name:"First Group",
    members:[{
        username:"ryguyl9",
        name:"Ryan Reszetnik",
        birthday:"2002-08-28",
        gender:"Male",
        photoUrl:"",
        numFriends:3
    }],
    datetime:"2021-06-01T20:00:00",
    bio:"Huuuuge night",
    averageAge:18,
    averageGender:"Male",
    location:{
        latitude:1234,
        longitude:123,
        address:"9 Strathgowan Crescent",
        postalCode:"M4N2Z6"
    },
    matchIds:[],//map to Match
    locationRange:25,
    ageRange:{
        minAge:16,
        maxAge:25
    },
    genderPreference:"Female",
    permanent:true,
    lastMessage:{
        id:"1",
        message:"Tug Squad Assemble",
        datetime:"2021-05-29T10:00:00",
        sender:"Ryan Reszetnik"
    }
},{
    id:"2",
    name:"Second Group",
    members:[{
        username:"ryguyl9",
        name:"Ryan Reszetnik",
        birthday:"2002-08-28",
        gender:"Male",
        photoUrl:"",
        numFriends:3
    }],
    datetime:"2021-06-01T20:00:00",
    bio:"big night",
    averageAge:18,
    averageGender:"Male",
    location:{
        latitude:1234,
        longitude:123,
        address:"9 Strathgowan Crescent",
        postalCode:"M4N2Z6"
    },
    matchIds:[],//map to Match
    locationRange:25,
    ageRange:{
        minAge:16,
        maxAge:25
    },
    genderPreference:"Female",
    permanent:true,
    lastMessage:{
        id:"1",
        message:"going out",
        datetime:"2021-05-29T10:00:00",
        sender:"Ryan Reszetnik"
    }
}
];
export default function groupsReducer(state:Group[]=INITIAL_STATE, action){
    switch(action.type){
        default:
            return state;
    }
}
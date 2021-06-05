import { SET_CUR_GROUP, ADD_PERM_GROUP, REMOVE_PERM_GROUP, GET_PERM_GROUPS} from "../Actions/groupActions";

const INITIAL_STATE = {permGroups:[{
    id:"1",
    name:"First Group",
    members:[{
        username:"ryguyl9",
        name:"Ryan Reszetnik",
        birthday:"2002-08-28",
        gender:"Male",
        photoUrl:"",
        numFriends:3,
        sub:"3123123"
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
        numFriends:3,
        sub:"jdsa;djsa"
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
], tempGroups:[], curGroup:null}
export default function groupsReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case SET_CUR_GROUP:
            return {...state, curGroup:action.payload}    
        case ADD_PERM_GROUP:
            return {permGroups:[...state.permGroups, action.payload]}
        case REMOVE_PERM_GROUP:
            return {permGroups:[...state.permGroups.filter((group)=>group.id !== action.payload)]}
        case GET_PERM_GROUPS:
            return {}
        default:
            return state;
    }
    
}
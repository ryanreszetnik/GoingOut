const maxLoaded = 1000;
const INITIAL_STATE = [];
import {LOAD_USERS} from "../Actions/friendActions"

/*
Priorities
    1. search users
    2. potential match member
    3. friend
    4. match member
    5. temp group members
    6. perm group members



*/


export default function friendReducer(state=INITIAL_STATE, action){
  const combineLists=(profiles,newProfiles)=>{
      if(profiles.length===0){
          return [...newProfiles];
      }else if(newProfiles.length===0){
          return [...profiles];
      }
      const allSubs = [...profiles.map(p=>p.sub),...newProfiles.map(p=>p.sub)];
    return Array.from(new Set(allSubs)).map(sub=>{
        const prof = profiles.find(p=>p.sub===sub)
        const newProf = newProfiles.find(p=>p.sub===sub)
        if(prof&&newProf){
            const higherPriority = Math.max(prof.priority,newProf.priority)
            return {...newProf,priority:higherPriority}
        }
        else if(prof){
            return prof;
        }
        return newProf;
    })
  }
  
    const removeExtra=(profiles,highPriority)=>{
    if(profiles.length<=maxLoaded){
        return profiles;
    }
    return profiles.sort((a,b)=>{
        if(highPriority.some(k=>k.sub===a.sub)){//a is high priority
            return 1;
        }
        return a.priority-b.priority;
    }).slice(profiles.length-maxLoaded)
  }

    switch(action.type){
        case LOAD_USERS:
            const newList = combineLists(state,action.payload)
            return removeExtra(newList,action.payload)
        default:
            return state;
    }
}


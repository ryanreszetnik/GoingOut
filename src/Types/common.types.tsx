export interface AppData{
    userSession:UserSession;
    profile:Profile;
    groups:Group[];
    tempGroups:Group[];
    chats:Chat[];
    loadedUsers:LoadedUser[];
    friends:Friend[];
}
export interface LoadedUser{
    priority:number;//lower priority will be removed first so we preserve memory
    /*Always takes higher priority if in multiple categories
    1. search users
    2. potential match member
    3. friend
    4. match member
    5. temp group members
    6. perm group members

    */
    sub:string;
    username:string;
    name:string;
    birthday:string;
    gender:string;
    numFriends:number;
}
export interface Friend{
    sub:string;
    status:string;
}
export interface UserSession{
    authStatus:string;
    user:any;//from aws
    userData:any;
    userGroups: any[]

}
export interface Profile{
    username:string;
    name:string;
    birthday:string;
    gender:string;
    photoUrl:string;
    email:string;
    phone:string;
    groups:Group[];
    numFriends:number;
}
export interface Friend{
    sub:string;
    username:string;
    status:string;
}
export interface Group{
    id:string;
    name:string;
    members:string[];
    datetime:string;
    bio:string;
    averageAge:number;
    averageGender:string;
    location:Location;
    matchIds:string[];//map to Match
    locationRange:number;
    ageRange:AgeRange;
    genderPreference:string;
    permanent:boolean;
    lastMessage:Message;
}
export interface CreateGroup{
    name:string;
    members:string[];
    datetime:string;
    bio:string;
    location:Location;
    locationRange:number;
    ageRange:AgeRange;
    genderPreference:string;
}
export interface Match{
    id:string;
    groupIds:string[];
    votes:Vote[];
}
export interface Chat{
    groupId:string;
    messages:Message[];
    lastMessage:Message;
}
export interface Message{
    id:string;
    message:string;
    datetime:string;
    sender:string;
}

export interface Vote{
    username:string;
    vote:string;
}

export interface AgeRange{
    minAge:number;
    maxAge:number;
}

export interface Location{
    latitude:number;
    longitude:number;
    address:string;
    postalCode:string;
}


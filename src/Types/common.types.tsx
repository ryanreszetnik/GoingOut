export interface AppData{
    userSession:UserSession;
    profile:Profile;
    groups:Group[];
    tempGroups:Group[];
    chats:Chat[];
}
export interface UserSession{
    authStatus:string;
    user:any;//from aws
    userData:any;

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
    members:MemberPreview[];
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
    members:MemberPreview[];
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
export interface MemberPreview{
    username:string;
    name:string;
    birthday:string;
    gender:string;
    photoUrl:string;
    numFriends:number;
}
export interface Location{
    latitude:number;
    longitude:number;
    address:string;
    postalCode:string;
}


export interface Message{
    groupId:string;
    messageId:string;
    message:string;
    datetime:string;
    sender:Sender;
}
interface Sender{
    name:string;
    username:string;
}
export interface CreateTempGroup{
    groupId:string;
    ageRange:AgeRange;
    baseGroup:string;
    bio:string;
    date:string;
    genderPref:string;
    isVisible:boolean;
    loc:Location;
    locRange:number;
    members:string[];
    name:string;
    time:string;
}
export interface EditTempGroup{
    groupId:string;
    ageRange?:AgeRange;
    bio?:string;
    date?:string;
    genderPref?:string;
    isVisible?:boolean;
    loc?:Location;
    locRange?:number;
    name?:string;
    time?:string;
}

export interface EditGroup{
    groupId:string;
    name?:string;
    bio?:string;
    loc?:Location;
    locRange?:number;
    ageRange?:AgeRange;
    genderPref?:string;
}

export interface Group{
    members:string[];//subs
    groupId:string;
    name:string;
    bio:string;
    loc:Location;
    locRange:number;
    ageRange:AgeRange;
    genderPref:string;
}
interface AgeRange{
    minAge:number;
    maxAge:number;
}
interface Location{
    lat:number;
    lon:number;
}

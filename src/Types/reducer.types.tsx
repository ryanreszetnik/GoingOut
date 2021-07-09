export interface GroupsReducer{
  permGroups: PermGroup[];
  curPermGroup: string;//groupId

  tempGroups: TempGroup[];
  curTempGroup: string;//groupId

  matches: Match[];//all the matches you have added
  curMatch: string;//matchId

  foundMatches: OtherTempGroup[];//for when you search for matches
  curFoundMatch:string;//groupId
}

interface PermGroup{
    groupId: string;
    name: string;
    members: Member[];
    tempGroups: string[];
    bio: string[];
    averageAge: number;
    averageGender: number;
    loc: Location;
    locRange: number,
    ageRange: AgeRange;
    genderPref: string
}
interface TempGroup{
    date:string;
    groupId:string;
    name:string;
    loc:Location;
    ageRange:AgeRange;
    genderPref:string;
    locRange:number;
    averageAge:number;
    averageGender:number;
    bio:string;
    members:Member[];
    isVisible:boolean;
    baseGroups:string[];
    time:string;
    tempGroups:string[];//to be added
}
interface OtherTempGroup{
    date:string;
    groupId:string;
    name:string;
    averageAge:number;
    averageGender:number;
    bio:string;
    members:Member[];
    time:string;
}
interface Match{
    matchId:string;
    groupId:string;
    otherGroup:OtherTempGroup;
}
interface Member{
    sub:string;
    name:string;
    birthdate:string;
    gender:string;
    username:string;
}
interface Location {
    lat:number;
    lon:number;
}
interface AgeRange{
    minAge:number;
    maxAge:number;
}

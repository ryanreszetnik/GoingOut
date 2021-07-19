//incoming events (within lambdas)
export const RECEIVE_MESSAGE = "recieveMessage"
export const MESSAGE_SENT = "messageSent"
export const FRIEND_UPDATE = "friendUpdate"

export const GROUPS_MERGED = "groupsMerged"
export const MATCH_ACCEPTED = "matchAccepted"

export const NEW_PERM_GROUP = "newPermGroup"
export const PERM_GROUP_LEFT = "permGroupLeft"
export const PERM_GROUP_OTHER_LEFT = "permGroupOtherLeft"
export const PERM_GROUP_UPDATED = "permGroupUpdated"
export const PERM_GROUP_MEMBERS_ADDED = "permGroupMembersAdded"

export const NEW_TEMP_GROUP = "newTempGroup"
export const TEMP_GROUP_LEFT = "tempGroupLeft"
export const TEMP_GROUP_OTHER_LEFT = "tempGroupOtherLeft"
export const TEMP_GROUP_UPDATED = "tempGroupUpdated"
export const TEMP_GROUP_MEMBERS_ADDED = "tempGroupMembersAdded"

//outgoing events (api gateway endpoints)
export const SEND_MESSAGE = "sendMessage"
export const SEND_FRIEND_REQUEST = "friendRequest"

export const REQUEST_MERGE = "requestMerge"
export const ACCEPT_MATCH = "acceptMatch"

export const CREATE_PERM_GROUP = "createPermGroup"
export const LEAVE_PERM_GROUP = "leavePermGroup"
export const ADD_PERM_GROUP_MEMBERS = "addPermGroupMembers"
export const EDIT_PERM_GROUP = "editPermGroup"

export const CREATE_TEMP_GROUP = "createTempGroup"
export const LEAVE_TEMP_GROUP = "leaveTempGroup"
export const ADD_TEMP_GROUP_MEMBERS = "addTempGroupMembers"
export const EDIT_TEMP_GROUP = "editTempGroup"
export const DELETE_TEMP_GROUP = "deleteTempGroup"

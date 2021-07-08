//incoming events (within lambdas)
export const RECEIVE_MESSAGE = "recieveMessage"
export const MESSAGE_SENT = "messageSent"
export const FRIEND_UPDATE = "friendUpdate"
export const NEW_PERM_GROUP = "newPermGroup"
export const GROUPS_MERGED = "groupsMerged"
export const MATCH_ACCEPTED = "matchAccepted"

//outgoing events (api gateway endpoints)
export const SEND_MESSAGE = "sendMessage"
export const SEND_FRIEND_REQUEST = "friendRequest"
export const CREATE_PERM_GROUP = "createPermGroup"
export const REQUEST_MERGE = "requestMerge"
export const ACCEPT_MATCH = "acceptMatch"

import {
  SET_GROUPS,
  ADD_GROUP,
  REMOVE_GROUP,
  EDIT_GROUP,
  REMOVE_GROUP_MEMBERS,
  ADD_GROUP_MEMBERS,
  ADD_EVENT,
} from "../../Constants/reducerEvents"

const INITIAL_STATE = []
export default function groupsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_GROUPS: //[Group]
      return action.payload
    case ADD_GROUP: //Group
      return [...state, action.payload]
    case ADD_EVENT: //Event
      return state.map((gr) => {
        if (action.payload.baseGroups.includes(gr.groupId)) {
          return {
            ...gr,
            events: [...gr.events, action.payload.eventId],
          }
        }
        return gr
      })
    case REMOVE_GROUP: //groupId
      return state.filter((gr) => gr.groupId !== action.payload)
    case EDIT_GROUP: //Group
      return state.map((gr) => {
        if (gr.groupId === action.payload.groupId) {
          return { ...gr, ...action.payload }
        }
        return gr
      })
    case REMOVE_GROUP_MEMBERS: //{groupId:"",members:[]}
      return state.map((gr) => {
        if (gr.groupId === action.payload.groupId) {
          return {
            ...gr,
            members: gr.members.filter((mem) => {
              return !action.payload.members.includes(mem)
            }),
          }
        }
        return gr
      })
    case ADD_GROUP_MEMBERS: //{groupId:"",subs:[]}
      return state.map((gr) => {
        if (gr.groupId === action.payload.groupId) {
          return {
            ...gr,
            members: [...gr.members, ...action.payload.subs],
          }
        }
        return gr
      })
    default:
      return state
  }
}

import {
  SET_TEMP_GROUPS,
  ADD_TEMP_GROUP,
  REMOVE_TEMP_GROUP,
  EDIT_TEMP_GROUP,
  REMOVE_TEMP_MEMBERS,
  ADD_TEMP_MEMBERS,
} from "../Actions/groupActions"
const INITIAL_STATE = []
export default function tempGroupsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TEMP_GROUPS: //[TempGroup]
      return action.payload
    case ADD_TEMP_GROUP: //TempGroup
      return [
        ...state.map((gr) => {
          if (action.payload.baseGroups.includes(gr.groupId)) {
            return {
              ...gr,
              tempGroups: [...gr.tempGroups, action.payload.groupId],
            }
          }
          return gr
        }),
        action.payload,
      ]
    case REMOVE_TEMP_GROUP: //groupId
      return state.filter((gr) => gr.groupId !== action.payload)
    case EDIT_TEMP_GROUP: //TempGroup
      return state.map((gr) => {
        if (gr.groupId === action.payload.groupId) {
          return action.payload
        }
        return gr
      })
    case REMOVE_TEMP_MEMBERS: //[subs]
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
    case ADD_TEMP_MEMBERS: //[Member]
      return state.map((gr) => {
        if (gr.groupId === action.payload.groupId) {
          return {
            ...gr,
            members: [...gr.members, ...action.payload],
          }
        }
        return gr
      })
    default:
      return state
  }
}

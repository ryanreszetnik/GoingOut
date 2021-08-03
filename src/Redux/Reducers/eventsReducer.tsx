import {
  SET_EVENTS,
  ADD_EVENT,
  REMOVE_EVENT,
  EDIT_EVENT,
  REMOVE_EVENT_MEMBERS,
  ADD_EVENT_MEMBERS,
} from "../../Constants/reducerEvents"
const INITIAL_STATE = []
export default function eventsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_EVENTS: //[Event]
      return action.payload
    case ADD_EVENT: //Event
      return [
        ...state.map((gr) => {
          if (action.payload.baseGroups.includes(gr.eventId)) {
            return {
              ...gr,
              events: [...gr.events, action.payload.eventId],
            }
          }
          return gr
        }),
        action.payload,
      ]
    case REMOVE_EVENT: //eventId
      return state.filter((gr) => gr.eventId !== action.payload)
    case EDIT_EVENT: //Event
      return state.map((gr) => {
        if (gr.eventId === action.payload.eventId) {
          return { ...gr, ...action.payload }
        }
        return gr
      })
    case REMOVE_EVENT_MEMBERS: //[subs]
      return state.map((gr) => {
        if (gr.eventId === action.payload.eventId) {
          return {
            ...gr,
            members: gr.members.filter((mem) => {
              return !action.payload.members.includes(mem)
            }),
          }
        }
        return gr
      })
    case ADD_EVENT_MEMBERS: //[Member]
      return state.map((gr) => {
        if (gr.eventId === action.payload.eventId) {
          return {
            ...gr,
            members: [...gr.members, ...action.payload.members],
          }
        }
        return gr
      })
    default:
      return state
  }
}

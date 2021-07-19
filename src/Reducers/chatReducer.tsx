import { ADD_CHAT, SET_CHATS } from "../Actions/chatActions"

const INITIAL_STATE = []
export default function chatReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CHATS:
      return [...action.payload]
    case ADD_CHAT:
      if (!state.find((chat) => chat.groupId === action.payload.groupId)) {
        return [
          ...state,
          {
            groupId: action.payload.groupId,
            lastmessage: action.payload,
            messages: [action.payload],
          },
        ]
      }
      return state.map((chat) => {
        if (chat.groupId === action.payload.groupId) {
          return {
            ...chat,
            messages: [...chat.messages, action.payload],
            lastmessage: action.payload,
          }
        }
        return chat
      })

    default:
      return state
  }
}

import { LOAD_USERS } from "../Actions/friendActions"
import { loadUsers } from "../Endpoints/generalEndpoints"
import store from "../Store/store"
let profiles = []
let profileSub = ""
function updateProfiles() {
  const state = store.getState()
  profiles = state.loadedProfiles
  profileSub = state.profile ? state.profile.sub : null
}
store.subscribe(updateProfiles)

export const ensureProfilesLoaded = async (subs, priority) => {
  const notLoaded = []
  const wrongPriority = []
  subs.forEach((sub) => {
    const prof = profiles.find((p) => p.sub === sub)
    if (!prof) {
      notLoaded.push(sub)
    } else if (prof.priority < priority) {
      wrongPriority.push({ ...prof, priority: priority })
    }
  })
  if (wrongPriority.length > 0) {
    // console.log("updating priority for ", wrongPriority.length)
    store.dispatch({ type: LOAD_USERS, payload: wrongPriority })
  }
  if (notLoaded.length === 0) {
    // console.log("already all loaded")
    return
  }
  const newProfiles = await loadUsers(notLoaded) //call api with subs
  store.dispatch({
    type: LOAD_USERS,
    payload: newProfiles.map((p) => {
      return { ...p, priority: priority }
    }),
  })
  //   console.log("loaded", newProfiles)
}

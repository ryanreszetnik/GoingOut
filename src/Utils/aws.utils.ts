import { S3Endpoint } from "../Constants/aws-exports"
import store from "../Redux/store"

export const getImageURIBySub = async (sub) => {
  const currSub = store.getState().profile.sub
  if (sub !== currSub) {
    return {
      uri: `${S3Endpoint}/${sub}`,
    }
  }
  return {
    uri: `${S3Endpoint}/${sub}?${Math.random()}`,
  }
}

export const awsConfig = {
  Auth: {
    identityPoolId: "ca-central-1:4d176069-d525-46dd-a565-6d01dc2a3376",
    region: "ca-central-1",
    userPoolId: "ca-central-1_1wFwWExJF",
    userPoolWebClientId: "4c6fiov8fmigrvo5fl7brlmkn",
  },
}

export const s3config = {
  accessKeyId: "AKIAT4EVW2RC72OGKMPR",
  secretAccessKey: "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",
  Bucket: "going-out-profiles",
  signatureVersion: "v4",
}
export const defaultImg = {
  uri: "https://going-out-profiles.s3.ca-central-1.amazonaws.com/default-profile-pic.jpg",
}
export const urlExists = async (url) => {
  var status
  await fetch(url).then((res) => {
    if (res.status === 404) {
      status = false
    } else {
      status = true
    }
  })
  return status
}
export const getImageURIBySub = async (sub) => {
  return (await urlExists(
    `https://going-out-profiles.s3.ca-central-1.amazonaws.com/${sub}`
  ))
    ? {
        uri: `https://going-out-profiles.s3.ca-central-1.amazonaws.com/${sub}`,
      }
    : defaultImg
}

export const endpoints = [
  {
    name: "GeneralEndpoint",
    endpoint: "https://bgxo72ph1d.execute-api.ca-central-1.amazonaws.com/prod/",
  },
]

export const socketURL =
  "wss://v1gd96esu2.execute-api.ca-central-1.amazonaws.com/prod"

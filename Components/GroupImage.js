import React, { useEffect, useState } from "react"
import { View, Text, Image } from "react-native"
import { useSelector } from "react-redux"
import { getImageURIBySub } from "../src/aws-exports"

const imgSize = 0.7

export default function GroupImage({ photoIds, size }) {
  const [photos, setPhotos] = useState([])
  const profilePhoto = useSelector((state) => state.profile.photo)
  const sub = useSelector((state) => state.userSession.user.attributes.sub)
  const getImageUrls = async () => {
    let filteredIds = photoIds.filter((s) => s !== sub)
    if (filteredIds.length === 0) {
      filteredIds = photoIds
    }
    const p = await Promise.all(
      filteredIds
        .filter((item, idx) => idx < 2)
        .map(async (id) => await getImageURIBySub(id))
    )

    setPhotos(p)
  }
  useEffect(() => {
    getImageUrls()
  }, [photoIds, profilePhoto])
  const getImage = () => {}

  return (
    <View style={{ width: size, height: size }}>
      {photos.length === 0 && <View></View>}
      {photos.length === 1 && (
        <Image
          source={photos[0]}
          style={{ width: size, height: size, borderRadius: size }}
        />
      )}
      {photos.length === 2 && (
        <View style={{ position: "relative" }}>
          <Image
            source={photos[0]}
            style={{
              position: "relative",
              left: (1 - imgSize) * size,
              top: 0,
              width: size * imgSize,
              height: size * imgSize,
              borderRadius: size * imgSize,
            }}
          />
          <Image
            source={photos[1]}
            style={{
              position: "relative",
              margin: 0,
              left: 0,
              bottom: size * (2 * imgSize - 1),
              width: size * imgSize,
              height: size * imgSize,
              borderRadius: size * imgSize,
            }}
          />
        </View>
      )}
    </View>
  )
}
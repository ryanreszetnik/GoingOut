export const getDistanceBetweenLocations = (loca,locb) => {
    var R = 6371 // Radius of the earth in km
    var dLat = deg2rad(loca.latitude - locb.latitude) // deg2rad below
    var dLon = deg2rad(loca.longitude - locb.longitude)
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(locb.latitude)) *
        Math.cos(deg2rad(loca.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c // Distance in km
    if (d < 10) {
      return Math.round(d * 10) / 10
    }
    return Math.round(d)
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
const getRandomInRange = (from, to, fixed) =>
  (Math.random() * (to - from) + from).toFixed(fixed) * 1

const carBody = (body) => {
  const {
    vin,
    registration_number,
    fuelLevel,
    mileage,
    currentRun,
    car_info,
    status,
    location
  } = body || {}

  return {
    vin,
    registration_number,
    fuelLevel,
    mileage,
    currentRun,
    car_info,
    status,
    location: location ?? {
      type: 'Point',
      coordinates: [
        getRandomInRange(-180, 180, 3),
        getRandomInRange(-90, 90, 3)
      ]
    },
    bookingHistory: [currentRun]
  }
}

module.exports = {
  carBody
}

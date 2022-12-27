import { Forecast } from '../types.js'

const forecasts: Forecast[] = []

function findAll(): Forecast[] {
  // Duboka kopija podataka da bi se simulirala baza podataka tako da izmene podataka u aplikaciji ne uticu na podatke u "bazi"
  const forecastDeepCopy = JSON.parse(JSON.stringify(forecasts))
  return forecastDeepCopy
}

function findByName(cities: string[]): Forecast[] {
  const filteredForecasts = forecasts.filter((forecast) =>
    cities.includes(forecast.city)
  )
  const forecastDeepCopy = JSON.parse(JSON.stringify(filteredForecasts))
  return forecastDeepCopy
}

function save(forecast: Forecast): void {
  forecasts.push(forecast)
}

const forecastRepository = { findAll, findByName, save }

export default forecastRepository

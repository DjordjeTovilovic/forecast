import forecastRepository from './forecast.repository.js'
import { AverageTemperature, Forecast } from '../types.js'
import {
  calculateAverageTemperature,
  filterCities,
  sortByTemperature,
} from '../utils/list.utils.js'
import { AverageTemperatureInput } from './forecast.schema.js'

function findAll(): Forecast[] {
  return forecastRepository.findAll()
}

function save(forecast: Forecast) {
  return forecastRepository.save(forecast)
}

function citiesAverageTemperature(
  body: AverageTemperatureInput
): AverageTemperature[] {
  const forecasts = filterCities(body.cities)
  const averageTemperature = calculateAverageTemperature(
    forecasts,
    body.timeInterval
  )
  const sortedForecasts = sortByTemperature(averageTemperature, body.sortBy)
  return sortedForecasts
}

const forecastService = { findAll, save, citiesAverageTemperature }

export default forecastService

import forecastRepository from '../forecast/forecast.repository.js'
import { AverageTemperature, Forecast, TimeInterval } from '../types.js'
import { convertToTimestamp } from './date.utils.js'

export function filterCities(cities: string[] = []): Forecast[] {
  if (cities.length !== 0) {
    return forecastRepository.findByName(cities)
  }
  return forecastRepository.findAll()
}

export function calculateAverageTemperature(
  forecasts: Forecast[],
  timeInterval: TimeInterval = {}
): AverageTemperature[] {
  return forecasts.map((cityForecast) => {
    const filteredCityForecast = filterTimeIntervals(cityForecast, timeInterval)
    const averageTemperature =
      calculateCityAverageTemperature(filteredCityForecast)
    const { city } = cityForecast
    return { city, averageTemperature }
  })
}

export function filterTimeIntervals(
  cityForecast: Forecast,
  timeInterval: TimeInterval
): Forecast {
  cityForecast.forecast = cityForecast.forecast.filter((forecast) => {
    if (timeInterval.start) {
      const start = convertToTimestamp(timeInterval.start)
      if (forecast.timestamp < start) {
        return null
      }
    }

    if (timeInterval.end) {
      const end = convertToTimestamp(timeInterval.end)
      if (forecast.timestamp > end) {
        return null
      }
    }

    return forecast
  })

  return cityForecast
}

export function calculateCityAverageTemperature(
  cityForecast: Forecast
): number {
  const sum = cityForecast.forecast.reduce(
    (acc, forecast) => acc + forecast.temperature,
    0
  )
  const average = sum / cityForecast.forecast.length
  return average
}

export function sortByTemperature(
  average: AverageTemperature[],
  sortBy = ''
): AverageTemperature[] {
  if (sortBy === 'descending') {
    return average.sort((a, b) => b.averageTemperature - a.averageTemperature)
  }
  if (sortBy === 'ascending') {
    return average.sort((a, b) => a.averageTemperature - b.averageTemperature)
  }
  return average
}

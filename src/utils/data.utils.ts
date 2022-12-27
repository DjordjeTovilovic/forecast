import fetch, { Response as FetchResponse } from 'node-fetch'
import config from 'config'
import { ApiForecast, Forecast } from '../types.js'
import forecastService from '../forecast/forecast.service.js'

export async function initializeData() {
  const availableCities = config.get<string[]>('availableCities')

  availableCities.forEach(async (city) => {
    const forecast = await getCityForecast(city)
    forecastService.save(forecast)
  })
}

export async function getCityForecast(city: string): Promise<Forecast> {
  const apiKey = process.env.OPEN_WEATHER_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

  const response: FetchResponse = await fetch(url)
  if (response.status === 401) {
    throw new Error(
      'You need to add your open weather api key in the .env file'
    )
  }
  const apiForecast = (await response.json()) as ApiForecast

  const forecast = parseApiForecast(apiForecast)
  return forecast
}

export function parseApiForecast(weatherForecast: ApiForecast): Forecast {
  const forecast = weatherForecast.list.map((apiForecast) => {
    const timestamp = apiForecast.dt
    const temperature = apiForecast.main.temp

    return { timestamp, temperature }
  })

  const city = weatherForecast.city.name
  return { city, forecast }
}

import { Request, Response } from 'express'
import config from 'config'
import forecastService from './forecast.service.js'
import { AverageTemperatureInput } from './forecast.schema.js'

export async function averageTemperatureHandler(
  req: Request<{}, {}, AverageTemperatureInput>,
  res: Response
) {
  const { body } = req
  const citiesAverageTemperature =
    forecastService.citiesAverageTemperature(body)
  res.send({ citiesAverageTemperature })
}

export async function availableCitiesHandler(req: Request, res: Response) {
  const availableCities = config.get<string[]>('availableCities')
  res.send({ availableCities })
}

import { Express } from 'express'
import {
  availableCitiesHandler,
  averageTemperatureHandler,
} from './forecast/forecast.controller.js'
import { averageTemperatureSchema } from './forecast/forecast.schema.js'
import validateRequest from './middleware/validateRequest.js'

export default function routes(app: Express) {
  /**
   * @openapi
   * '/api/cities':
   *  get:
   *     tags:
   *     - Cities
   *     summary: Get all available cities
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                availableCities:
   *                  type: array
   *                  example: ['Novi Sad', 'London', 'New York']
   */
  app.get('/api/cities', availableCitiesHandler)

  /**
   * @openapi
   * '/api/forecast/average':
   *  post:
   *     tags:
   *     - Forecast
   *     summary: Get the average temperature for selected or all cities
   *              for the next 5 days or a selected period in those 5 days
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/AverageTemperatureInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/AverageTemperatureResponse'
   */
  app.post(
    '/api/forecast/average',
    validateRequest(averageTemperatureSchema),
    averageTemperatureHandler
  )
}

import { object, string, TypeOf } from 'zod'

/**
 * @openapi
 * components:
 *  schemas:
 *    AverageTemperatureInput:
 *      type: object
 *      properties:
 *        cities:
 *          type: array
 *          example: ['Novi Sad', 'London']
 *        timeInterval:
 *          type: object
 *          properties:
 *            start:
 *              type: string
 *              example: 2022-12-27T12:35:31.820Z
 *            end:
 *              type: string
 *              example: 2022-12-28T23:35:31Z
 *        sortBy:
 *          type: string
 *          example: ascending
 *    AverageTemperatureResponse:
 *      type: object
 *      properties:
 *        citiesAverageTemperature:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              city:
 *                example: Novi Sad
 *                description: Name of the city
 *              averageTemperature:
 *                type: number
 *                example: 283
 *                description: Average temperature of the city
 */

const payload = {
  cities: string().array().optional(),
  timeInterval: object({
    start: string()
      .datetime({
        message: 'Invalid datetime string! Must be a valid UTC ISO8601 string.',
      })
      .optional(),
    end: string()
      .datetime({
        message: 'Invalid datetime string! Must be a valid UTC ISO8601 string.',
      })
      .optional(),
  }).optional(),
  sortBy: string().optional(),
}

export const averageTemperatureSchema = object({
  ...payload,
})

export type AverageTemperatureInput = TypeOf<typeof averageTemperatureSchema>

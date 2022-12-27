import supertest from 'supertest'
import forecastRepository from '../forecast/forecast.repository.js'
import createServer from '../server.js'
import {AverageTemperature} from '../types.js'
import {
  testForecastData,
  averageTemperaturePayload,
  availableCities,
  sortByAscending,
  expectedCitiesAverageTemperatureSchema,
  sortByDescending,
} from './test.data.js'

const app = createServer()

describe('GET /api/cities endpoint', () => {
  describe('given someone makes a request', () => {
    it('should return available cities', async () => {
      const { body } = await supertest(app).get('/api/cities').expect(200)
      expect(body).toEqual({ availableCities })
    })
  })
})

describe('POST /api/forecast/average endpoint', () => {
  beforeAll(async () => {
    testForecastData.forEach(forecastRepository.save)
  })

  describe('given someone makes a request with no body', () => {
    it('should return all cities average temperature', async () => {
      const { body } = await supertest(app)
        .post('/api/forecast/average')
        .expect(200)

      expect(body.citiesAverageTemperature).toHaveLength(availableCities.length)
      expect(body.citiesAverageTemperature).toEqual(
        expectedCitiesAverageTemperatureSchema
      )
    })
  }),
    describe('given someone makes a request with all but the last viable city in request body', () => {
      it('should not contain the last viable city', async () => {
        const { body } = await supertest(app)
          .post('/api/forecast/average')
          .send({ cities: averageTemperaturePayload.cities })
          .expect(200)

        expect(body.citiesAverageTemperature).toHaveLength(
          averageTemperaturePayload.cities.length
        )
        expect(body.citiesAverageTemperature).toEqual(
          expectedCitiesAverageTemperatureSchema
        )

        expect(body.citiesAverageTemperature).not.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              city: availableCities[-1],
            }),
          ])
        )
      })
    }),
    describe('given someone makes a request with sortBy descending', () => {
      it('should return cities sorted descending by average temperature', async () => {
        const { body } = await supertest(app)
          .post('/api/forecast/average')
          .send({ sortBy: sortByDescending })
          .expect(200)

        expect(body.citiesAverageTemperature).toHaveLength(
          availableCities.length
        )
        expect(body.citiesAverageTemperature).toEqual(
          expectedCitiesAverageTemperatureSchema
        )

        const cityWithHighestAverageTemperature: AverageTemperature =
          body.citiesAverageTemperature[0]

        expect(
          body.citiesAverageTemperature.every(
            (city: AverageTemperature) =>
              cityWithHighestAverageTemperature.averageTemperature >=
              city.averageTemperature
          )
        ).toBe(true)
      })
    }),
    describe('given someone makes a request with sortBy ascending', () => {
      it('should return cities sorted ascending by average temperature', async () => {
        const { body } = await supertest(app)
          .post('/api/forecast/average')
          .send({ sortBy: sortByAscending })
          .expect(200)

        expect(body.citiesAverageTemperature).toHaveLength(
          availableCities.length
        )
        expect(body.citiesAverageTemperature).toEqual(
          expectedCitiesAverageTemperatureSchema
        )

        const cityWithLowestAverageTemperature: AverageTemperature =
          body.citiesAverageTemperature[0]

        expect(
          body.citiesAverageTemperature.every(
            (city: AverageTemperature) =>
              cityWithLowestAverageTemperature.averageTemperature <=
              city.averageTemperature
          )
        ).toBe(true)
      })
    }),
    describe('given someone makes a request with all body parameters', () => {
      it('should return passed cities sorted descending by average temperature', async () => {
        const { body } = await supertest(app)
          .post('/api/forecast/average')
          .send(averageTemperaturePayload)
          .expect(200)

        expect(body.citiesAverageTemperature).toHaveLength(
          averageTemperaturePayload.cities.length
        )
        expect(body.citiesAverageTemperature).toEqual(
          expectedCitiesAverageTemperatureSchema
        )

        const cityWithHighestAverageTemperature: AverageTemperature =
          body.citiesAverageTemperature[0]
          
        expect(
          body.citiesAverageTemperature.every(
            (city: AverageTemperature) =>
              cityWithHighestAverageTemperature.averageTemperature >=
              city.averageTemperature
          )
        ).toBe(true)
      })
    })
})

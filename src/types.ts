export interface Temperature {
  timestamp: number
  temperature: number
}

export interface Forecast {
  city: string
  forecast: Array<Temperature>
}

export interface AverageTemperature {
  city: string
  averageTemperature: number
}

export interface TimeInterval {
  start?: string
  end?: string
}

export interface ApiForecast {
  city: {
    name: string
  }
  list: {
    dt: number
    main: {
      temp: number
    }
  }[]
}

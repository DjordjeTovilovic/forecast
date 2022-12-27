# Forecast api

A simple api that takes weather forecast data for the next 5 days from the free [open weather api](https://openweathermap.org/forecast5) 
and calculates the average temperature for the cities specified in the config file.

## Installation

Navigate to the project root folder and run the following command to install the dependencies

```bash
npm install 
```

Make an account and get an api key at [openweathermap.org](https://openweathermap.org/forecast5), then duplicate the .env.example file and rename it to .env 
and paste your key in the OPEN_WEATHER_API_KEY env variable.

Start the api by running 

```bash
npm start 
```

To change the available cities edit the availableCities property in the config/default.json file.

## Usage

The server is running on [**http://localhost:3000**](http://localhost:3000)

Swagger docs are available at [**http://localhost:3000/docs**](http://localhost:3000/docs)

### GET /api/cities
Returns the available cities.

### POST /api/forecast/average
Returns the average temperatures for the next 5 days.
It can take an optional request body in the form of 

```json
{
  "cities": [
    "Novi Sad",
    "London"
  ],
  "timeInterval": {
    "start": "2022-12-27T12:35:31.820Z",
    "end": "2022-12-28T23:35:31Z"
  },
  "sortBy": "ascending"
}
```

The cities field specifies the cities for which we want to return the average temperature. Don't send this field if you want all the cities.

The timeInterval field specifies the period in the next 5 days in which we want to calculate the average temperature, you can send only the start field or only the end field or both. Don't send this field if you want the whole 5 days.

The sortBy field specifies the order of averge temperatures in which you want the data to be sorted. The currenly valid options are 'ascending' and 'descending'.
Don't send this field if order is not important

All fields are optional.

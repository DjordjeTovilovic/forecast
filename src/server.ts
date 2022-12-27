import express from 'express'
import * as dotenv from 'dotenv'
import routes from './routes.js'

function createServer() {
  dotenv.config()

  const app = express()

  app.use(express.json())

  routes(app)

  return app
}

export default createServer

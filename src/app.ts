import config from 'config'
import createServer from './server.js'
import { initializeData } from './utils/data.utils.js'
import swaggerDocs from './utils/swagger.js'

const app = createServer()

const port = config.get<number>('port')

app.listen(port, async () => {
  await initializeData()

  console.log(`Server listening at http://localhost:${port}`)

  swaggerDocs(app, port)
})

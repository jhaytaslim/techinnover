import config from 'config'
import { version } from '../package.json'

import auth from './controllers/auth'
import { app, httpServer} from './startup'

const mongoose = require('mongoose');

const port = config.get<number>('port')
const host = config.get<string>('host')

app.use('/', auth)

let db = config.get('db')

mongoose
  .connect((db), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    httpServer.listen(port, host, () => {     
      console.info(`🚀 Server version ${version} is listening 🚀`)    
    })
  })
  .catch((err: any) => console.error("Could not connect to MongoDB...", err));
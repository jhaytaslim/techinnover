import cors from 'cors'
import { createServer } from 'http'
import config from 'config'
import express from 'express'


const corsOrigin = config.get<string>('corsOrigin')
const app = express()

// app.use(express.json({ limit: '100mb'}))
// app.use(express.urlencoded({ limit: '100mb', extended:true }))
// app.use(express.static('public'))

app.use((req, res, next) => {
  if (req.originalUrl.includes('/webhook')) {
    next();
  } else {
    express.json({ limit: '100mb'})(req, res, next);
    express.urlencoded({ limit: '100mb', extended:true });
    express.static('public');
  }
});

app.use(cors({
  origin: corsOrigin,
  credentials: true
}))

const httpServer = createServer(app)



export { app, httpServer }
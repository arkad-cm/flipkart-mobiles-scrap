import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

import scrapRoutes from './routes/scrapRoutes.js'
import indexRoutes from './routes/indexRoutes.js'
import loggingRoutes from './routes/loggingRoutes.js'
import dbRoutes from './routes/dbRoutes.js'

import { connect } from './db.js'
import scheduleScrapJob from './schedule.js'
import { ApiError } from './utils/ApiError.js'
import logger from './utils/logger.js'
import events from './events.js'

const app = express()
dotenv.config()

app.use('/', indexRoutes)
app.use('/db', dbRoutes)
app.use('/logs', loggingRoutes)
app.use('/scrap', scrapRoutes)
app.use('/', (req: Request, res: Response) => {
  res.statusCode = 404
  throw new ApiError(res, 'Not Found - ' + req.path, 404)
})

//@ts-ignore
app.use((err, req, res: Response, next) => {
  console.log(err)
  logger.error(events.ERROR_API, err.message)
  logger.stacktrace(err.stack)
  res.json({ status: 'FAILURE', message: err.message })
})

const PORT = process.env.PORT || 8000

await connect()

scheduleScrapJob()

app.listen(PORT, () => console.log(`Server Listening on PORT ${PORT}`))

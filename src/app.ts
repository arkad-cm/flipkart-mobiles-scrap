import express, { Response } from 'express'
import dotenv from 'dotenv'
import scrapRoutes from './routes/scrapRoutes.js'
import indexRoutes from './routes/indexRoutes.js'
import { connect } from './db.js'

const app = express()
dotenv.config()

app.use('/', indexRoutes)
app.use('/scrap', scrapRoutes)
app.use('/', (req, res) => {
  res.statusCode = 404
  throw new Error('Not Found - ' + req.path)
})

//@ts-ignore
app.use((err, req, res: Response, next) => {
  console.log(err)
  if (res.statusCode < 400) {
    res.statusCode = 400
  }
  res.json({ status: 'FAILURE', message: err.message })
})

const PORT = process.env.PORT || 8000

await connect()

app.listen(PORT, () => console.log(`Server Listening on PORT ${PORT}`))

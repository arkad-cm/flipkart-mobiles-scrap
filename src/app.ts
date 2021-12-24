import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import scrapRoutes from './routes/scrapRoutes.js'
import indexRoutes from './routes/indexRoutes.js'
import { connect } from './db.js'
import {ApiError} from "./utils/ApiError.js";
import dbRoutes from "./routes/dbRoutes.js";

const app = express()
dotenv.config()

app.use('/', indexRoutes)
app.use('/db', dbRoutes)
app.use('/scrap', scrapRoutes)
app.use('/', (req:Request, res:Response) => {
  res.statusCode = 404
  throw new ApiError(res, 'Not Found - ' + req.path, 404)
})

//@ts-ignore
app.use((err, req, res: Response, next) => {
  console.log(err)
  res.json({ status: 'FAILURE', message: err.message })
})

const PORT = process.env.PORT || 8000

await connect()

app.listen(PORT, () => console.log(`Server Listening on PORT ${PORT}`))

import express from 'express'
import { scrapFlipkartMobilesToDb } from '../controllers/scrapControllers.js'

const router = express.Router()

router.get('/', scrapFlipkartMobilesToDb)

export default router

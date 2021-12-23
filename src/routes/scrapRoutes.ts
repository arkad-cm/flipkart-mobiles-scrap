import express from 'express'
import { scrapFlipkartMobilesToDb, clearDb } from '../controllers/scrapControllers.js'

const router = express.Router()

router.get('/', scrapFlipkartMobilesToDb)
router.get('/clear', clearDb)

export default router

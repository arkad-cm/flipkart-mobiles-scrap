import express from 'express'
import { getAllMobiles, removeAllMobiles } from '../controllers/dbControllers.js'

const router = express.Router()

router.get('/', getAllMobiles)
router.get('/clear', removeAllMobiles)

export default router

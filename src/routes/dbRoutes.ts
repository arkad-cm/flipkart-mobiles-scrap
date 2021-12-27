import express from 'express'
import { getAllMobiles } from '../controllers/dbControllers.js'

const router = express.Router()

router.get('/', getAllMobiles)

export default router

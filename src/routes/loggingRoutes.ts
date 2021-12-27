import express from 'express'
import { getDebugLogs, getErrorLogs } from '../controllers/loggingControllers.js'

const router = express.Router()

router.get('/debug', getDebugLogs)

router.get('/error', getErrorLogs)

export default router

import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import logger from '../utils/logger.js'
import events from '../events.js'

export const getApiStatus = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json({
      status: 'SUCCESS',
      message: 'API is Running...',
      scrap: 'http://' + req.headers.host + req.url + 'scrap',
    })
    logger.info(
      events.ACCESS_INDEX_API,
      ``,
    )
  },
)

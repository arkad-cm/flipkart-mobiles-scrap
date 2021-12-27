import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import scrapMobiles from '../scrap.js'
import { ApiError } from '../utils/ApiError.js'
import logger from '../utils/logger.js'
import events from '../events.js'

export const scrapFlipkartMobilesToDb = asyncHandler(
  async (req: Request, res: Response) => {
    let pages = +(req.query.pages || 1)
    let from = +(req.query.from || 1)
    let to = +(req.query.to || from + pages - 1)

    if (from > to) {
      to = from - to
      from -= to
      to = from + to
    }
    pages = to - from + 1
    try {
      logger.info(
        events.ON_DEMAND_UPDATE_START,
        `Starting to Sync latest changes with configuration: {from: ${from}, to: ${to}, pages: ${pages}}`,
      )
      const results = await scrapMobiles(from, to)
      logger.info(
        events.ON_DEMAND_UPDATE_END,
        `Synced DB with configuration: {from: ${from}, to: ${to}, pages: ${pages}}. Stored Count = ${results.length}`,
      )
      res.status(200).json({
        status: 'SUCCESS',
        pages: { from, to, pages },
        count: results.length,
        message: results.length
          ? 'Saved mobile details into DB'
          : 'No details was found',
        results,
      })
    } catch (e: any) {
      logger.error(
        events.ERROR_ON_DEMAND_UPDATE,
        `Failed to sync latest changes manually. Error Message = ${e.message}, Configuration: {from: ${from}, to: ${to}, pages: ${pages}}. `,
      )
      logger.stacktrace(e.stack)
      throw new ApiError(res, e.message)
    }
  },
)

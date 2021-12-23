import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import rp from 'request-promise'
import cheerio from 'cheerio'

import MobileDetailModel from '../models/MobileDetail.model.js'

export const scrapFlipkartMobilesToDb = asyncHandler(
  async (req: Request, res: Response) => {
    const flipkartUrl = `https://www.flipkart.com/`
    const mobiles: {
      name: String
      price: String
      link: String
    }[] = []

    let pages = +(req.query.pages || 1)
    let from = +(req.query.from || 1)
    let to = +(req.query.to || from + pages - 1)

    if (from > to) {
      to = from - to
      from -= to
      to = from + to
    }
    pages = to - from + 1

    for (let i = from; i <= to; i++) {
      const url = `${flipkartUrl}search?q=mobiles&page=${i}`
      try {
        const html = await rp(url)
        const $ = cheerio.load(html)
        $('a._1fQZEK').each((_, el) => {
          const href = $(el).attr('href')?.substring(1)
          const link = flipkartUrl + href?.substring(0, href.indexOf('?'))
          const name = $(el).find('div._4rR01T').text()
          const price = $(el).find('div._30jeq3._1_WHN1').text()
          mobiles.push({ name, price, link })
        })
      } catch (e: any) {
        throw new Error(e)
      }
    }

    const results = await MobileDetailModel.insertMany(mobiles)
    res.status(200).json({
      status: 'SUCCESS',
      pages: { from, to, pages },
      count: results.length,
      message: results.length ? 'Saved mobile details into DB' : 'No details was found',
      results,
    })
  },
)

export const clearDb = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await MobileDetailModel.deleteMany()
    res.status(200).json({
      status: 'SUCCESS',
      result,
    })
  },
)

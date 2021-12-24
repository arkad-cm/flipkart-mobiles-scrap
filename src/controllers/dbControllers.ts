import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import FlipkartMobileModel from '../models/FlipkartMobile.model.js'

const getNumberOrDefault = (
  val: any,
  options: {
    def: number
    min?: number
    max?: number
  },
): number => {
  const { min, max, def } = options
  if (!val) {
    return def
  }
  const result = +val
  if (isNaN(result)) {
    return def
  }

  if (min && val < min) {
    return def
  }

  if (max && val > max) {
    return def
  }

  return result
}

export const getAllMobiles = asyncHandler(
  async (req: Request, res: Response) => {
    const count = await FlipkartMobileModel.count()
    const limit = getNumberOrDefault(req.query.size, {
      def: 10,
      min: 1,
      max: 50,
    })
    const page = getNumberOrDefault(req.query.page, {
      def: 1,
      min: 1,
      max: count / limit,
    })
    const results = await FlipkartMobileModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
    res.status(200).json({
      status: 'SUCCESS',
      page: { number: page, size: limit, count: results.length },
      results,
    })
  },
)

export const removeAllMobiles = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await FlipkartMobileModel.deleteMany()
    res.status(200).json({
      status: 'SUCCESS',
      result,
    })
  },
)

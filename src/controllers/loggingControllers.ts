import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import readLastLines from '../utils/file-utils.js'

export const getDebugLogs = asyncHandler(
  async (req: Request, res: Response) => {
    await getLogs(req, res, 'debug')
  },
)

export const getErrorLogs = asyncHandler(
  async (req: Request, res: Response) => {
    await getLogs(req, res, 'error')
  },
)

const getLogs = async (req: Request, res: Response, fileName: string) => {
  let maxLineCount = +req.query.lines! || 100
  if (maxLineCount > 100) {
    maxLineCount = 100
  }
  let lines = (await readLastLines(`logs/${fileName}.log`, maxLineCount)).split(
    '\n',
  )
  lines = lines.slice(0, lines.length - 1)
  res.status(200).json({
    status: 'SUCCESS',
    message: 'Retrieved logs successfully',
    count: lines.length,
    lines,
  })
}

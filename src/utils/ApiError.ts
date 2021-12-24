import { Response } from 'express'

export class ApiError extends Error {
  constructor(
    res: Response,
    msg: string,
    code: 400 | 404 | 409 | 422 | 500 | 502 | 503 = 400,
  ) {
    res.statusCode = code
    super(msg)
  }
}

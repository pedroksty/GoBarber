import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'

import router from './routes'
import AppError from '@shared/errors/AppError'
import uploadConfig from '@config/upload'

import '@shared/infra/typeorm'
import '@shared/container'

export const port = 4444

const app = express()

app.use(express.json())
app.use(cors())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      })
    }

    console.error(err)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
)

export default app

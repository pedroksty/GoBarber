import 'reflect-metadata'

import express from 'express'
import router from './routes'

import './database'

const app = express()

export const port = 4444

app.use(express.json())

app.use(router)

export default app

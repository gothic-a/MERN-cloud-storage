import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import accountRouter from './router/accountRouter.js'
import errorMiddleware from './middlewares/errorMiddleware.js' 

import connectDB from './config/db.js'

dotenv.config()
connectDB()

const app = express()

app.use(cookieParser())
app.use(express.json())
if (process.env.MODE === 'development') app.use(morgan('dev'))

app.get('/', (req, res, next) => res.send('cloud API'))

app.use('/api/account', accountRouter)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
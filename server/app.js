import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import accountRouter from './router/accountRouter.js'
import errorMiddleware from './middlewares/errorMiddleware.js' 

import connectDB from './config/db.js'

dotenv.config()
connectDB()

const app = express()

if(process.env.MODE === 'development') app.use(morgan('dev'))
app.use(express.json())

app.use('/api/account', accountRouter)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
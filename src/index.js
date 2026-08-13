import express from 'express'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import connectToDb from './database/mongodb.js'

config()

import { PORT } from './config/env.js'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import errorMiddleware from './middlewares/error.middleware.js'
import arcjetMiddleware from './middlewares/arcjet_middleware.js'

const app = express()

// Body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Cookies
app.use(cookieParser())

// Request logger
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`)
  next()
})

// Routes
app.get('/', (req, res) => {
  console.log('✅ ROOT ROUTE HIT')

  res.status(200).json({
    success: true,
    message: 'Backend is working'
  })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)

// Error middleware MUST be last
app.use(errorMiddleware)
app.use(arcjetMiddleware)

// Start server after database connection
const startServer = async () => {
  try {
    await connectToDb()

    console.log('✅ MongoDB connected')

    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://127.0.0.1:${PORT}`)
    })
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  }
}

startServer()

export default app
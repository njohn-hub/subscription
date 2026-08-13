import express from 'express'

const app = express()
const PORT = 5000

app.use((req, res, next) => {
  console.log('REQUEST RECEIVED:', req.method, req.originalUrl)
  next()
})

app.get('/', (req, res) => {
  console.log('ROOT ROUTE EXECUTED')

  res.status(200).json({
    success: true,
    message: 'Express is working'
  })
})

app.listen(PORT, '127.0.0.1', () => {
  console.log(`TEST SERVER RUNNING ON http://127.0.0.1:${PORT}`)
})

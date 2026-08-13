import { Router } from 'express'
import { login, signup } from '../controllers/auth.controller.js'

const authRouter = Router()

authRouter.post('/sign-up', signup)

authRouter.post('/login', login)

// authRouter.post('/logout', logout)

export default authRouter

import express from 'express'
const router=express.Router()
import {createUserController,loginController} from '../controllers/user.controller.js'

router.post('/signUp',createUserController)
.post('/signIn',loginController)

export default router

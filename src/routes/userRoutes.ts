import express from "express"
import userController from "../controller/userController"

import { authMiddleware } from "../middleware/auth"
import { userAuth } from "../middleware/userAuth"

const router = express.Router()

router.get('/' ,userController.getUsers)

router.post('/register' ,userController.register)

router.post('/login' ,userController.LoginData)

router.get('/login' ,authMiddleware , userController.authUser)



router.get('/myProfile'  ,userAuth , userController.getOneUserDetail)

router.patch('/details' ,userAuth , userController.userDetails)

router.post('/fpassword', userController.forgetPassword)

router.get('/reset-password/:id/:token', userController.resetPassword)

router.post('/reset-password/:id', userAuth ,  userController.postResetPassword)








router.delete('/:id' ,userController.deleteUser)

router.patch('/:id' ,userController.updateUsers)







export default router
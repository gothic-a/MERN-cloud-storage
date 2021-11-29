import { Router } from 'express'
import accountController from '../controllers/accountController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const { protect, protectActivate } = authMiddleware
const { create, activate } = accountController

const router = Router()

router.route('/create').post(create)
router.route('/activate').post(protectActivate, activate)
router.route('/login').post()
router.route('/logout').post()
router.route('/refresh').get()

router.route('/info').get()
router.route('/update').put()

export default router
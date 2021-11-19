import { Router } from 'express'
import accountController from '../controllers/accountController.js'

const { create } = accountController

const router = Router()

router.route('/create').post(create)
router.route('/activate').post()
router.route('/login').post()
router.route('/logout').post()
router.route('/refresh').get()

router.route('/info').get()
router.route('/update').put()

export default router
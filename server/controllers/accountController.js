import ApiErrors from '../exceptions/apiErrors.js'
import userService from '../services/account/userService.js'

class AccountController {
    async create(req, res, next) {
        try { 
            const { email, password, name } = req.body

            const userData = await userService.create(email, password, name)

            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }   

    async activate(req, res, next) {
        try {
            const { activationCode } = req.body
            const userId = req.user

            const userData = await userService.activate(activationCode, userId)
        } catch(e) {
            next(e)
        }
    }
}

export default new AccountController
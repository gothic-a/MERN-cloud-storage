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
        } catch(e) {

        }
    }
}

export default new AccountController
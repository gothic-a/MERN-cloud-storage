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
            const { activationCode, device = null } = req.body
            const userId = req.user
            const ip = req.ip === '::1' ? '127:0:0:1' : req.ip

            const { user, accessToken, refreshToken } = await userService.activate(activationCode, userId, ip, device)

            res.cookie('refreshToken', refreshToken, { maxAge: 45 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.json({
                user,
                accessToken
            })
        } catch(e) {
            next(e)
        }
    }
}

export default new AccountController
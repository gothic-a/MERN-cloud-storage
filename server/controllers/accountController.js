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

    async login(req, res, next) {
        try {
            const { email, password, device = null } = req.body
            const ip = req.ip === '::1' ? '127:0:0:1' : req.ip

            const { user, ...tokens } = await userService.login(email, password, ip, device)

            if(user.isActivated) {
                const { accessToken, refreshToken } = tokens

                res.cookie('refreshToken', refreshToken, { maxAge: 45 * 24 * 60 * 60 * 1000, httpOnly: true })
                return res.json({
                    user,
                    accessToken
                })
            } else {
                const { tempToken } = tokens
                return res.json({
                    user,
                    tempToken
                })
            }
        } catch(e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const { device = null } = req.body
            const ip = req.ip === '::1' ? '127:0:0:1' : req.ip

            const tokens = await userService.refresh(refreshToken, ip, device)

            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 45 * 24 * 60 * 60 * 1000, httpOnly: true })

            res.json({ accessToken: tokens.accessToken })
        } catch(e) {
            next(e)
        }
    }
}

export default new AccountController
import ApiErrors from "../exceptions/apiErrors.js"
import tokenService from "../services/account/tokenService.js"

class AuthMiddlewares {
    protect(req, res, next) {
        try {

        } catch(e) {

        }
    }

    protectActivate(req, res, next) {
        try {
            const authHeader = req.headers.authorization
            const tempToken = authHeader.split(' ')[1]

            if(!tempToken || !authHeader) throw ApiErrors.Unauthorized()

            const decodedToken = tokenService.validateTemporaryToken(tempToken)

            if(!decodedToken.isTemporary) throw ApiErrors.Unauthorized()

            req.user = decodedToken.id

            next()
        } catch(e) {
            next(ApiErrors.Unauthorized())
        }
    }
}

export default new AuthMiddlewares
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

            if(!tempToken || !authHeader) throw ApiErrors.Unauthorized('Credantials is not provided')

            const decodedToken = tokenService.validateTemporaryToken(tempToken)

            if(!decodedToken.isTemporary) throw ApiErrors.Unauthorized('Fake token')

            req.user = decodedToken.id

            next()
        } catch(e) {
            if(e.message === 'jwt expired') {
                next(ApiErrors.TokenExpired())
            } else {
                next(ApiErrors.Unauthorized())
            }
        }
    }
}

export default new AuthMiddlewares
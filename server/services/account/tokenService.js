import jwt from 'jsonwebtoken'

class TokenService {
    createTemporaryToken(userData) {
        const payload = Object.assign(userData, { isTemporary: true })
        const temporaryToken = jwt.sign(payload, process.env.JWT_TEMPORARY_SECRET, {expiresIn: '30m'})
        
        return temporaryToken
    }
}

export default new TokenService
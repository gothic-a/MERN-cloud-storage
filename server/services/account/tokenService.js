import jwt from 'jsonwebtoken'

class TokenService {
    createTemporaryToken(userData) {
        const payload = Object.assign(userData, { isTemporary: true })

        const temporaryToken = jwt.sign(payload, process.env.JWT_TEMPORARY_SECRET, {expiresIn: '30m'})
        
        return temporaryToken
    }

    createPairToken(userData) {
        const accessToken = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign(userData, process.env.JWT_REFRESH_SECRET, {expiresIn: '45d'})
        
        return {
            accessToken,
            refreshToken
        }
    }

    validateTemporaryToken(token) {
        const userData = jwt.verify(token, process.env.JWT_TEMPORARY_SECRET)

        return userData
    }

    validateAccessToken(token) {
        const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

        return userData
    }

    validateRefreshToken(token) {
        const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)

        return userData
    }
}

export default new TokenService
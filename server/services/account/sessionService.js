import SessionModel from '../../models/SessionModel.js'

class SessionService {
    async create(userId, refreshToken, ip, device) {
        const session = await SessionModel.create({
            user: userId,
            refreshToken,
            ip,
            device
        })

        return session
    }

    async find(refreshToken) {

    }

    async refresh(userId, refreshToken, ip, device) {

    }
}

export default new SessionService
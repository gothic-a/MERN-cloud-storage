import SessionModel from '../../models/SessionModel.js'

class SessionService {
    async create(userId, refreshToken, ip = null, device = null) {
        const userSessions = await SessionModel.find({user: userId}).sort({updatedAt: -1})

        if(userSessions.length >= 5) {
            const lastSessionId = userSessions[userSessions.length - 1]._id

            await SessionModel.findByIdAndDelete(lastSessionId)
        } 

        const session = await SessionModel.create({
            user: userId,
            refreshToken,
            ip,
            device
        })

        return session
    }

    async refresh(userId, refreshToken, ip, device) {

    }
}

export default new SessionService
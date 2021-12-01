import SessionModel from '../../models/SessionModel.js'
import tokenService from './tokenService.js'

class SessionService {
    async create(user, ip = null, device = null) {
        const userSessions = await SessionModel.find({user: user.id}).sort({updatedAt: -1})

        if(userSessions.length >= 5) {
            const lastSessionId = userSessions[userSessions.length - 1]._id

            await SessionModel.findByIdAndDelete(lastSessionId)
        } 

        const session = await SessionModel.create({
            user: user.id,
            ip,
            device
        })

        const { accessToken, refreshToken } = tokenService.createPairToken({...user, session: session._id})

        session.refreshToken = refreshToken

        await session.save()

        return {
            session,
            accessToken,
            refreshToken
        }
    }

    async refresh(userId, refreshToken, ip, device) {

    }
}

export default new SessionService
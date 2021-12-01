import ApiErrors from '../../exceptions/apiErrors.js'
import SessionModel from '../../models/SessionModel.js'
import tokenService from './tokenService.js'
import userService from './userService.js'

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

        const { accessToken, refreshToken } = tokenService.createPairToken({...user, sessionId: session._id})

        session.refreshToken = refreshToken

        await session.save()

        return {
            session,
            accessToken,
            refreshToken
        }
    }

    async refresh(token, ip, device) {
        const { sessionId, id} = tokenService.validateRefreshToken(token)
        
        const session = await SessionModel.findOne({_id: sessionId, user: id})

        if(!session || session.refreshToken !== token) throw ApiErrors.Unauthorized()
        const user = await userService.getUserData(id)

        const { accessToken, refreshToken } = tokenService.createPairToken({...user, sessionId: session._id})
        
        session.refreshToken = refreshToken 
        session.ip = ip
        session.device = device

        await session.save()

        return {
            accessToken,
            refreshToken
        }
    }
}

export default new SessionService
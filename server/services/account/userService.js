import UserModel from '../../models/UserModel.js'

import tokenService from './tokenService.js'
import MailService from './mailService.js'
import cloudService from '../cloud/cloudService.js'
import sessionService from './sessionService.js'
import subscriptionService from './subscriptionService.js'

import ApiErrors from '../../exceptions/apiErrors.js'

import { UserDto, ExtendedUserDto } from '../../dtos/userDto.js'
import generateCode from '../../utils/generateCode.js'

class UserService { 
    async create(email, password, name) {
        const userExists = await UserModel.exists({email: email})

        if (userExists) throw ApiErrors.Conflict('User with this email already exist')

        const activationCode = generateCode(6)

        const mailService = new MailService()
        await mailService.sendCode(email, activationCode)

        const user = await UserModel.create({
            email,
            password,
            name,
            activationCode
        })

        const userDto = new UserDto(user)

        const tempToken = tokenService.createTemporaryToken({...userDto}) 

        return {
            tempToken,
            user: userDto
        }
    }

    async activate(activationCode, userId, ip, device) {
        const user = await UserModel.findById(userId)

        if (!user) throw ApiErrors.BadRequest('User not found')
        if (user.isActivated) throw ApiErrors.BadRequest('User already activated')

        if (user.activationCode === activationCode) {
            user.isActivated = true
        } else {
            throw ApiErrors.BadRequest('Fake activation code')
        }

        const cloud = await cloudService.create(userId)
        user.cloud = cloud._id

        const subscription = await subscriptionService.create(userId)
        user.subscription = subscription._id

        const userDto = new UserDto(user)

        const { session, accessToken, refreshToken } = await sessionService.create(userDto, ip, device)
        user.sessions.push(session._id)

        await user.save()

        return { 
            user: userDto,
            accessToken,
            refreshToken
        }
    }

    async login(email, password, ip, device) {
        const user = await UserModel.findOne({email})

        if(!user) throw ApiErrors.BadRequest('Wrong email or password')

        const isPassEquals = await user.comparePassword(password)
        if(!isPassEquals) throw ApiErrors.BadRequest('Wrong email or password')

        const userDto = new UserDto(user)

        if(!user.isActivated) {
            const tempToken = tokenService.createTempToken({...userDto})

            return {
                tempToken,
                user: userDto
            }
        } else {
            const { session, accessToken, refreshToken } = await sessionService.create(userDto, ip, device)
            user.sessions.push(session._id)

            await user.save()

            return { 
                user: userDto,
                accessToken,
                refreshToken
            }
        }
    }

    async refresh(token, ip, device) {
        if(!token) throw ApiErrors.Unauthorized()

        const { accessToken, refreshToken } = await sessionService.refresh(token, ip, device)

        return { 
            accessToken, 
            refreshToken
        }
    }

    async getUserData(id) {
        const user = await UserModel.findById(id)
        const userDto = new UserDto(user)

        return userDto
    }
}

export default new UserService
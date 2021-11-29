import UserModel from '../../models/UserModel.js'

import tokenService from './tokenService.js'
import MailService from './mailService.js'
import cloudService from '../cloud/cloudService.js'
import sessionService from './sessionService.js'

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

        const tempToken = tokenService.createTemporaryToken({
            id: userDto.id,
            email: userDto.email,
            name: userDto.name
        }) 

        return {
            tempToken,
            user: userDto
        }
    }

    async activate(activationCode, userId) {
        const user = await UserModel.findById(userId)

        if (!user) throw ApiErrors.BadRequest('User not found')

        // check activation code

        if (user.activationCode === activationCode) {
            user.isActivated = true
        } else {
            throw ApiErrors.BadRequest('Fake activation code')
        }

        // create user cloud 

        const cloud = await cloudService.create(userId)

        user.cloud = cloud._id

        // create subscription

        // create session 




        await user.save()
    }
}

export default new UserService
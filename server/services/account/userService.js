import UserModel from '../../models/UserModel.js'

import tokenService from './tokenService.js'
import MailService from './mailService.js'
import sessionService from './sessionService.js'

import ApiErrors from '../../exceptions/apiErrors.js'

import UserDto from '../../dtos/userDto.js'
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

        const tempToken = tokenService.createTemporaryToken({email}) 
        const userDto = new UserDto(user)

        return {
            tempToken,
            user: userDto
        }
    }
}

export default new UserService
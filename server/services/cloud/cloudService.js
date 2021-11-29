import CloudModel from "../../models/CloudModel.js";
import { nanoid } from 'nanoid'

class CloudService {
    async create(userId) {
        const folderId = nanoid() 

        const cloud = await CloudModel.create({
            user: userId,
            awsFolder: `${folderId}/`
        })

        return cloud 
    }
}

export default new CloudService
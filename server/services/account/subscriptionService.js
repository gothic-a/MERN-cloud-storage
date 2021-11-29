import SubscriptionModel from '../../models/SubscriptionModel.js'
import PlanModel from '../../models/PlanModel.js'

class SubscriptionService {
    async create(userId, planId) {
        let plan

        if (!planId) {
            plan = await PlanModel.findOne({value: 0}) 
        }

        if (plan.value === 0) {
            const subscription = await SubscriptionModel.create({
                user: userId,
                expiredAt: null,
                plan: plan._id
            })

            return subscription
        }
    }
}   

export default new SubscriptionService
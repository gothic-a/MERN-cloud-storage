class UserDto {
    constructor(model) {
        this.id = model._id
        this.email = model.email 
        this.name = model.name
        this.isActivated = model.isActivated
    }
}

export default UserDto
class UserDto {
    constructor(model) {
        this.id = model._id.toString()
        this.email = model.email 
        this.name = model.name
        this.isActivated = model.isActivated
    }
}

class ExtendedUserDto extends UserDto {
    constructor(model) {
        super(model)
    }
}

export { UserDto, ExtendedUserDto }
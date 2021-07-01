const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, "the name is required"]
    },
    email: {
        type: String,
        required: [true, "the email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "the password is required"]
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }

})


// tiene que ser funcion normal para poder usar el this
// esto borra la _v y el password del retorno
UserSchema.methods.toJSON = function () {

    const { __v, password, ...user } = this.toObject();
    return user;



}

module.exports = model('User', UserSchema);
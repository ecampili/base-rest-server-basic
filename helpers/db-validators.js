const Role = require('../models/Role');
const User = require('../models/User')

const validateRole = async (role = '') => {
    const exists = await Role.findOne({ role })
    if (!exists) {
        throw new Error('El role no esta registrado en la db')
    }
}
const existsEmail = async (email = '') => {
    const exists = await User.findOne({ email })
    if (exists) {
        throw new Error(`El email: ${email} ya esta registrado`)
    }
}

const existsUserById = async (id = '') => {
    const exists = await User.findById(id)
    if (!exists) {
        throw new Error(`El user no existe`)
    }
}

module.exports = {
    validateRole,
    existsEmail,
    existsUserById
}